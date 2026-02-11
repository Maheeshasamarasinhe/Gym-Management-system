# Fix for Java Compilation Error: TypeTag :: UNKNOWN

## Problem Identified
The error `java.lang.ExceptionInInitializerError com.sun.tools.javac.code.TypeTag :: UNKNOWN` was caused by:

**IntelliJ IDEA was configured to use Java 24, while the project requires Java 17.**

## What Was Fixed

### 1. Updated IntelliJ IDEA Configuration
- `.idea/misc.xml` - Changed from JDK_24 to JDK_17
- `.idea/compiler.xml` - Added Lombok annotation processor configuration

### 2. Enhanced Maven Configuration (pom.xml)
Added explicit compiler settings:
```xml
<properties>
    <java.version>17</java.version>
    <maven.compiler.source>17</maven.compiler.source>
    <maven.compiler.target>17</maven.compiler.target>
    <maven.compiler.release>17</maven.compiler.release>
    <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
    <lombok.version>1.18.30</lombok.version>
</properties>
```

Added Maven Compiler Plugin with Lombok annotation processing:
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-compiler-plugin</artifactId>
    <version>3.11.0</version>
    <configuration>
        <source>17</source>
        <target>17</target>
        <release>17</release>
        <encoding>UTF-8</encoding>
        <annotationProcessorPaths>
            <path>
                <groupId>org.projectlombok</groupId>
                <artifactId>lombok</artifactId>
                <version>${lombok.version}</version>
            </path>
        </annotationProcessorPaths>
    </configuration>
</plugin>
```

## Steps to Resolve

### Method 1: Using IntelliJ IDEA (Recommended)

1. **Reload Maven Project**
   - Right-click on `pom.xml` in Project Explorer
   - Select **Maven** → **Reload Project**

2. **Verify Java SDK**
   - Go to **File** → **Project Structure** → **Project**
   - Ensure **SDK** is set to **Java 17** (or corretto-17, or any Java 17 distribution)
   - If Java 17 is not available:
     - Click **Add SDK** → **Download JDK**
     - Select **Version: 17** and download

3. **Set Language Level**
   - In the same Project Structure window
   - Set **Language level** to **17 - Sealed types, always-strict floating-point semantics**

4. **Invalidate Caches** (if needed)
   - Go to **File** → **Invalidate Caches**
   - Select **Invalidate and Restart**

5. **Clean and Rebuild**
   - Go to **Build** → **Clean Project**
   - Then **Build** → **Rebuild Project**

### Method 2: Using Command Line

Run the provided batch script:
```batch
rebuild.bat
```

Or manually run these commands:
```batch
mvnw.cmd clean
mvnw.cmd compile
```

### Method 3: Manual Maven Commands

1. Clean the project:
   ```batch
   mvnw.cmd clean
   ```

2. Compile the project:
   ```batch
   mvnw.cmd compile
   ```

3. Run the application:
   ```batch
   mvnw.cmd spring-boot:run
   ```

## Verification

After applying the fix, you should see:
- ✅ No compilation errors
- ✅ Project compiles successfully with Java 17
- ✅ Lombok annotations work correctly
- ✅ Spring Boot application starts without errors

## Common Issues and Solutions

### Issue 1: "Cannot find Java 17"
**Solution:** Download and install Java 17 from:
- [Amazon Corretto 17](https://aws.amazon.com/corretto/)
- [Oracle JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [Eclipse Temurin 17](https://adoptium.net/)

### Issue 2: IntelliJ still uses wrong JDK
**Solution:**
1. File → Project Structure → Project
2. Change SDK to Java 17
3. File → Settings → Build, Execution, Deployment → Build Tools → Maven → Importing
4. Set JDK for importer to Java 17

### Issue 3: Lombok not working
**Solution:**
1. Install Lombok Plugin in IntelliJ:
   - File → Settings → Plugins
   - Search for "Lombok"
   - Install and restart IDE
2. Enable annotation processing:
   - File → Settings → Build, Execution, Deployment → Compiler → Annotation Processors
   - Check "Enable annotation processing"

## Prevention

To prevent this issue in the future:
1. Always check your IDE's JDK settings match your project requirements
2. Use `mvnw` (Maven Wrapper) instead of system Maven for consistency
3. Keep dependencies up to date (though be aware of breaking changes)
4. Use explicit compiler plugin configurations in pom.xml

## Related Files Modified
- `pom.xml` - Enhanced with explicit compiler configuration
- `.idea/misc.xml` - Changed Java version from 24 to 17
- `.idea/compiler.xml` - Added Lombok annotation processor
- `rebuild.bat` - Created for easy rebuilding

## Technical Details

The `TypeTag :: UNKNOWN` error occurs when:
- The Java compiler version doesn't match the bytecode target version
- Annotation processors (like Lombok) are incompatible with the compiler version
- IntelliJ IDEA uses a different JDK than what Maven is configured for

Spring Boot 3.2.5 requires:
- Java 17 or later (but not all features work with Java 24+)
- Maven 3.6.3 or later (project uses 3.9.6)
- Compatible versions of Lombok (project uses 1.18.30)

---
**Last Updated:** February 11, 2026
