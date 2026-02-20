# Xcode iOS Wrapper Guide (WKWebView)

This guide shows how to wrap the hosted Gear Track PWA in a native iOS app using Xcode. This is a **thin wrapper** around the web app — all content and updates remain in the hosted site.

---

## 1) Prerequisites
- The app must be hosted on HTTPS (PorkBun hosting + SSL enabled)
- Know your public URL (example: `https://gear.yourdomain.com`)

---

## 2) Create the iOS App in Xcode
1. Open **Xcode** → **File** → **New** → **Project**
2. Select **iOS** → **App**
3. Product Name: `GearTrack`
4. Interface: **SwiftUI**
5. Language: **Swift**
6. Bundle Identifier: your reverse‑domain ID

---

## 3) Add a WebView Wrapper

Create a new Swift file: `WebView.swift`

```swift
import SwiftUI
import WebKit

struct WebView: UIViewRepresentable {
    let url: URL

    func makeUIView(context: Context) -> WKWebView {
        let webView = WKWebView()
        webView.allowsBackForwardNavigationGestures = true
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        let request = URLRequest(url: url)
        webView.load(request)
    }
}
```

---

## 4) Update `ContentView.swift`

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        WebView(url: URL(string: "https://3-61402.ca")!)
            .ignoresSafeArea()
    }
}
```

Hosted PorkBun URL set to `https://3-61402.ca`.

---

## 5) Recommended Info.plist Settings
If you are using HTTPS (recommended), no special settings are required.

If you must use HTTP (not recommended), add:
- **App Transport Security Settings** → `Allow Arbitrary Loads = YES`

---

## 6) App Icon (Optional)
Use the same icons from `gear-track-app/public/icons/` when setting the iOS App Icon set in Xcode.

---

## 7) Build & Run
- Select a simulator or connected device
- Press **Run**
- Your hosted site will load inside the app

---

## Notes
- This wrapper uses the live site, so updates happen instantly without App Store re‑submission.
- If you later want offline capability or native features, we can extend this wrapper or build a fully native version.
