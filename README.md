# 🍽️ GastroManager Premium

**GastroManager** es un sistema inteligente de gestión restaurantera y facturación electrónica de alta gama. Diseñado para ofrecer una experiencia de usuario premium, combina una estética moderna con funcionalidades robustas para la administración de restaurantes líderes.

---

## ✨ Características Principales

### 🧾 Facturación Electrónica (CFDI 4.0)
- **Emisión Instantánea**: Genera facturas a partir de tickets de mesa con un solo clic.
- **Validación Fiscal**: Validación en tiempo real de RFC y datos obligatorios del SAT.
- **Vista Previa PDF**: Visualización profesional de facturas listas para descargar.
- **Simulación de Timbrado**: Flujo completo de certificación (Sandbox).

### 👩‍🍳 Monitor de Cocina (Comandas)
- **Gestión en Tiempo Real**: Visualiza y gestiona el estado de las órdenes (En preparación, Listo, Entregado).
- **Control de Tiempos**: Seguimiento visual del tiempo transcurrido por comanda.

### 📋 Gestión de Menú
- **Inventario Digital**: Alta, edición y baja de platillos con categorías personalizadas.
- **Precios Dinámicos**: Actualización instantánea de costos y disponibilidad.

### 📊 Dashboard de Control
- **Estadísticas Críticas**: Visualización de ventas del día, facturas timbradas y tickets pendientes.
- **Historial Completo**: Buscador inteligente de facturas emitidas por RFC o cliente.

### 🎨 Experiencia Premium (UX/UI)
- **Welcome Screen**: Pantalla de bienvenida con animaciones de alta fidelidad.
- **Sistema de Toasts**: Notificaciones flotantes elegantes para feedback del sistema.
- **Diseño Glassmorphism**: Interfaz moderna con desenfoques, gradientes y micro-interacciones.

---

## 🛠️ Tecnologías Utilizadas

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Lenguaje**: [TypeScript](https://www.typescriptlang.org/)
- **Estilos**: [Tailwind CSS](https://tailwindcss.com/)
- **Iconografía**: [Lucide React](https://lucide.dev/)
- **Animaciones**: Tailwind Animate & Framer Motion (implícito)

---

## 📂 Estructura del Proyecto

```text
src/
├── components/     # Componentes de UI reutilizables (StatCard, NavItem, etc.)
├── services/       # Lógica de negocio y simulaciones (facturaService)
├── models/         # Definiciones de tipos e interfaces (Factura, Item)
app/
├── page.tsx        # Dashboard Principal y orquestación de estados
├── layout.tsx      # Configuración global y fuentes
```

---

## 🚀 Instalación y Uso

1. **Clonar el repositorio**:
   ```bash
   git clone [url-del-repo]
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. **Acceder a la aplicación**:
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🔧 Configuración SAT
Para simular el timbrado real, dirígete a la pestaña de **Configuración** y carga tus archivos `.cer` y `.key` (simulación). Asegúrate de que el RFC del emisor esté configurado correctamente en el servicio de facturación.

---

Desarrollado con ❤️ para la excelencia en el servicio gastronómico.
