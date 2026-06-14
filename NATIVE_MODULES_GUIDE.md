# Guide: Custom Native Modules & React Native New Architecture in Expo

This project is configured to use **Expo Prebuild (Continuous Native Generation)** and **React Native's New Architecture**. This allows you to add custom Swift/Kotlin native modules seamlessly without losing the benefits of Expo's managed workflow.

---

## 1. Project Configuration

The project has been configured in `app.json` with the following setting:
```json
{
  "expo": {
    "newArchEnabled": true
  }
}
```
Setting `newArchEnabled` to `true` instructs Expo's prebuild engine to configure the underlying Android and iOS project files to build with the **New Architecture** (Fabric Renderer and TurboModules).

---

## 2. Architecture of Local Expo Modules

Instead of manually editing the `ios/` or `android/` folders (which are generated/modified on-the-fly by prebuild), custom native code is packaged as **Local Expo Modules**.

These live in the `modules/` directory:
```
modules/
└── my-custom-module/
    ├── expo-module.config.json  # Links native classes to Expo autolinker
    ├── package.json             # Registers module package
    ├── index.ts                 # JavaScript/TypeScript wrapper
    ├── ios/
    │   ├── MyCustomModule.swift # iOS implementation (Swift)
    │   └── MyCustomModule.podspec
    └── android/
        ├── build.gradle
        └── src/main/java/com/vibediet/mycustommodule/MyCustomModule.kt  # Android implementation (Kotlin)
```

The app's main `package.json` resolves this local module via a file reference:
```json
"dependencies": {
  "my-custom-module": "file:./modules/my-custom-module"
}
```
Expo Autolinking automatically detects any npm dependency containing an `expo-module.config.json` and wires it up during the build process.

---

## 3. Expo Modules API: Swift & Kotlin

The **Expo Modules API** allows writing high-performance native code using modern Swift and Kotlin DSLs. It fully abstracts the New Architecture, generating TurboModule specs under the hood.

### iOS Swift Implementation (`ios/MyCustomModule.swift`)
```swift
import ExpoModulesCore

public class MyCustomModule: Module {
  public func definition() -> ModuleDefinition {
    // Defines the module name imported in Javascript/TypeScript
    Name("MyCustomModule")

    // Export a synchronous or asynchronous function
    Function("helloWorld") { () -> String in
      return "Hello from iOS!"
    }
    
    // Example: Function with parameters
    Function("multiply") { (a: Double, b: Double) -> Double in
      return a * b
    }
  }
}
```

### Android Kotlin Implementation (`android/.../MyCustomModule.kt`)
```kotlin
package com.vibediet.mycustommodule

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class MyCustomModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("MyCustomModule")

    Function("helloWorld") {
      "Hello from Android!"
    }

    Function("multiply") { a: Double, b: Double ->
      a * b
    }
  }
}
```

---

## 4. How to Run and Build the Project

### Running in Development (Expo Go / Web Fallback)
By default, standard Expo Go cannot execute new native code that is not already compiled into the Expo Go client. 

To prevent runtime crashes, `modules/my-custom-module/index.ts` uses a safe check:
```typescript
import { requireNativeModule } from 'expo-modules-core';

let MyCustomModule: any = null;
try {
  MyCustomModule = requireNativeModule('MyCustomModule');
} catch (e) {
  // Gracefully handles environment without the native binary linked
}

export function helloWorld(): string {
  if (MyCustomModule && typeof MyCustomModule.helloWorld === 'function') {
    return MyCustomModule.helloWorld();
  }
  return "Native module not available (requires custom development build)";
}
```
If you run `npm run start` or `npm run web`, the app will load with this fallback message instead of crashing.

### Running with Native Code (Development Builds)
To compile and test your custom native Swift and Kotlin modules:

1. **Generate the native directories (`ios` / `android`)**
   ```bash
   npx expo prebuild
   ```
   *Note: These folders are gitignored because they can be fully recreated anytime using `npx expo prebuild`.*

2. **Compile and Run on Simulator/Device**
   To build the native app binary with your local module linked and run it on a simulator or physical device:
   - **For iOS:**
     ```bash
     npx expo run:ios
     ```
   - **For Android:**
     ```bash
     npx expo run:android
     ```
   This compiles a **Development Build** of the app which bundles the Expo development server client alongside your custom native modules. Once the app launches on the device, it will automatically connect to your Metro bundler, and your native module calls (e.g., `helloWorld()`) will execute the actual native Swift/Kotlin code!

---

## 5. Adding More Custom Native Modules

If you want to add another module in the future:
1. Run `npx create-expo-module@latest modules/my-new-module --local` to scaffold a fresh module structure automatically, or duplicate the `modules/my-custom-module` folder.
2. Add the dependency in your root `package.json`:
   `"my-new-module": "file:./modules/my-new-module"`.
3. Run `npm install` to link the new dependency.
4. Run `npx expo prebuild` to regenerate the native project files containing the new module.
5. Compile the app using `npx expo run:ios` or `npx expo run:android`.
