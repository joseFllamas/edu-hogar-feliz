import { useEffect, useRef } from "react";
import type { CentroMock } from "@/lib/centers-mock";

type Props = {
  centros: CentroMock[];
  onSelect?: (c: CentroMock) => void;
};

// Renders a Leaflet map with simple pixel-bucket clustering.
// Dynamically imports leaflet so SSR is safe.
export function MapView({ centros, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const layerRef = useRef<any>(null);
  const LRef = useRef<any>(null);

  // Init map once
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const L = (await import("leaflet")).default;
      // CSS via CDN (Lightning CSS can't @import remote in styles.css)
      if (!document.getElementById("leaflet-css")) {
        const link = document.createElement("link");
        link.id = "leaflet-css";
        link.rel = "stylesheet";
        link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
        document.head.appendChild(link);
      }
      if (cancelled || !containerRef.current || mapRef.current) return;
      LRef.current = L;
      const map = L.map(containerRef.current, {
        center: [40.2, -3.6],
        zoom: 6,
        scrollWheelZoom: true,
        zoomControl: true,
      });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);
      mapRef.current = map;
      layerRef.current = L.layerGroup().addTo(map);
      map.on("zoomend moveend", render);
      render();
    })();
    return () => {
      cancelled = true;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Rebuild markers whenever the list changes
  useEffect(() => {
    if (!mapRef.current) return;
    render();
    // Fit bounds when set changes meaningfully
    if (centros.length > 0 && LRef.current) {
      const L = LRef.current;
      const bounds = L.latLngBounds(centros.map((c) => [c.lat, c.lng]));
      mapRef.current.fitBounds(bounds.pad(0.15), { animate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [centros]);

  function render() {
    const map = mapRef.current;
    const layer = layerRef.current;
    const L = LRef.current;
    if (!map || !layer || !L) return;
    layer.clearLayers();

    const zoom = map.getZoom();
    const bounds = map.getBounds();
    const visible = centros.filter((c) =>
      bounds.contains(L.latLng(c.lat, c.lng)),
    );

    // Pixel-bucket clustering
    const bucketPx = 64;
    const buckets = new Map<string, CentroMock[]>();
    for (const c of visible) {
      const p = map.latLngToContainerPoint([c.lat, c.lng]);
      const key = `${Math.floor(p.x / bucketPx)},${Math.floor(p.y / bucketPx)}`;
      let arr = buckets.get(key);
      if (!arr) {
        arr = [];
        buckets.set(key, arr);
      }
      arr.push(c);
    }

    for (const arr of buckets.values()) {
      if (arr.length === 1 || zoom >= 14) {
        for (const c of arr) addPin(c);
      } else {
        addCluster(arr);
      }
    }
  }

  function addPin(c: CentroMock) {
    const L = LRef.current;
    const icon = L.divIcon({
      className: "",
      html: `<div class="ecl-pin"><span>${c.score.toFixed(1)}</span></div>`,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
    const marker = L.marker([c.lat, c.lng], { icon }).addTo(layerRef.current);
    const html = `
      <div class="ecl-popup">
        <p class="ecl-popup__name">${escapeHtml(c.nombre)}</p>
        <p class="ecl-popup__meta">${escapeHtml(c.tipo)} · ${escapeHtml(c.localidad)}</p>
        <div class="ecl-popup__row">
          <span class="ecl-popup__score">${c.score.toFixed(1)}</span>
          ${c.recomendado ? '<span class="ecl-popup__chip">Recomendado</span>' : ""}
        </div>
        <button type="button" data-slug="${c.slug}" class="ecl-popup__cta">Ver ficha →</button>
      </div>`;
    marker.bindPopup(html);
    marker.on("popupopen", () => {
      const node = document.querySelector(`button[data-slug="${c.slug}"]`);
      node?.addEventListener("click", () => onSelect?.(c), { once: true });
    });
  }

  function addCluster(arr: CentroMock[]) {
    const L = LRef.current;
    const lat = arr.reduce((s, x) => s + x.lat, 0) / arr.length;
    const lng = arr.reduce((s, x) => s + x.lng, 0) / arr.length;
    const size = arr.length >= 50 ? 56 : arr.length >= 15 ? 48 : 40;
    const icon = L.divIcon({
      className: "",
      html: `<div class="ecl-cluster" style="width:${size}px;height:${size}px"><span>${arr.length}</span></div>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
    const marker = L.marker([lat, lng], { icon }).addTo(layerRef.current);
    marker.on("click", () => {
      const bounds = L.latLngBounds(arr.map((c) => [c.lat, c.lng]));
      mapRef.current.fitBounds(bounds.pad(0.25));
    });
  }

  return <div ref={containerRef} className="h-full w-full" aria-label="Mapa de centros" />;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (m) =>
    m === "&" ? "&amp;" : m === "<" ? "&lt;" : m === ">" ? "&gt;" : m === '"' ? "&quot;" : "&#39;",
  );
}
