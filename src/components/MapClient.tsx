"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import ThemeToggle from "./ThemeToggle";
import SignOutButton from "./SignOutButton";

const CZ_CENTER: [number, number] = [15.473, 49.8175];
const DEFAULT_ZOOM = 7;
const STORAGE_KEY = "openmind-map-view";

interface SavedView {
  center: [number, number];
  zoom: number;
}

function loadView(): SavedView | null {
  if (typeof window === "undefined") {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as SavedView;
    if (
      Array.isArray(parsed.center) &&
      parsed.center.length === 2 &&
      typeof parsed.center[0] === "number" &&
      typeof parsed.center[1] === "number" &&
      typeof parsed.zoom === "number"
    ) {
      return {
        center: [parsed.center[0], parsed.center[1]],
        zoom: parsed.zoom,
      };
    }
  } catch {
    // ignore malformed storage
  }
  return null;
}

export default function MapClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) {
      return;
    }

    const container = containerRef.current;
    const saved = loadView();
    const center = saved?.center ?? CZ_CENTER;
    const zoom = saved?.zoom ?? DEFAULT_ZOOM;

    const map = new maplibregl.Map({
      container,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
            tileSize: 256,
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors',
          },
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm",
            minzoom: 0,
            maxzoom: 19,
          },
        ],
      },
      center,
      zoom,
    });

    map.addControl(
      new maplibregl.NavigationControl({ showCompass: true }),
      "top-right"
    );
    map.addControl(new maplibregl.FullscreenControl(), "top-right");

    map.on("error", (e) => {
      const message =
        e?.error?.message ?? "Mapu se nepodařilo načíst. Zkuste to znovu.";
      setMapError(message);
    });

    map.on("moveend", () => {
      const c = map.getCenter();
      const z = map.getZoom();
      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ center: [c.lng, c.lat], zoom: z })
        );
      } catch {
        // ignore quota / storage errors
      }
    });

    mapRef.current = map;

    // Ensure the map fills its container once styles settle and on any resize.
    const resize = () => map.resize();
    map.once("load", resize);
    const raf = window.requestAnimationFrame(resize);
    const observer = new ResizeObserver(resize);
    observer.observe(container);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(raf);
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <main className="relative h-dvh w-full">
      <div ref={containerRef} className="h-full w-full" />
      {mapError ? (
        <div className="absolute inset-0 z-20 flex items-center justify-center p-4">
          <div className="max-w-md rounded-lg border border-red-300 bg-red-50 p-4 text-center text-sm text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-300">
            <p className="font-semibold">Mapu se nepodařilo načíst</p>
            <p className="mt-1 break-words">{mapError}</p>
          </div>
        </div>
      ) : null}
      <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
        <ThemeToggle />
        <SignOutButton />
      </div>
    </main>
  );
}
