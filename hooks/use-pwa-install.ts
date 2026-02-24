"use client";

import { useState, useEffect, useCallback } from "react";

interface BeforeInstallPromptEvent extends Event {
    prompt(): Promise<void>;
    userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

interface UsePWAInstallReturn {
    isInstallable: boolean;
    isInstalled: boolean;
    isIOS: boolean;
    promptInstall: () => Promise<void>;
}

export function usePWAInstall(): UsePWAInstallReturn {
    const [deferredPrompt, setDeferredPrompt] =
        useState<BeforeInstallPromptEvent | null>(null);
    const [isInstalled, setIsInstalled] = useState(false);
    const [isIOS, setIsIOS] = useState(false);

    useEffect(() => {
        // Detect iOS
        const ua = navigator.userAgent;
        const isIOSDevice =
            /iPad|iPhone|iPod/.test(ua) ||
            (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
        setIsIOS(isIOSDevice);

        // Detect if already installed via display-mode
        const isStandalone =
            window.matchMedia("(display-mode: standalone)").matches ||
            (window.navigator as any).standalone === true;
        setIsInstalled(isStandalone);

        // Listen for display-mode changes
        const mediaQuery = window.matchMedia("(display-mode: standalone)");
        const handleChange = (e: MediaQueryListEvent) => {
            setIsInstalled(e.matches);
        };
        mediaQuery.addEventListener("change", handleChange);

        // Listen for beforeinstallprompt
        const handleBeforeInstall = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
        };
        window.addEventListener("beforeinstallprompt", handleBeforeInstall);

        // Listen for appinstalled
        const handleInstalled = () => {
            setIsInstalled(true);
            setDeferredPrompt(null);
        };
        window.addEventListener("appinstalled", handleInstalled);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
            window.removeEventListener(
                "beforeinstallprompt",
                handleBeforeInstall
            );
            window.removeEventListener("appinstalled", handleInstalled);
        };
    }, []);

    const promptInstall = useCallback(async () => {
        if (deferredPrompt) {
            await deferredPrompt.prompt();
            const { outcome } = await deferredPrompt.userChoice;
            if (outcome === "accepted") {
                setIsInstalled(true);
            }
            setDeferredPrompt(null);
        } else if (isIOS) {
            // On iOS, we can't programmatically install — show instructions
            // The component using this hook should handle the isIOS case
            // by showing a modal with "Share → Add to Home Screen" instructions
        }
    }, [deferredPrompt, isIOS]);

    return {
        isInstallable: deferredPrompt !== null || isIOS,
        isInstalled,
        isIOS,
        promptInstall,
    };
}
