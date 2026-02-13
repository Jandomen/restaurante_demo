# Plan de Implementación: Facturación Electrónica

Para implementar facturación electrónica (CFDI 4.0) en esta aplicación de restaurante, seguiremos estos pasos:

## 1. Requisitos Legales y Técnicos (Lo que tú necesitas proporcionar)
Para poder emitir facturas reales ante el SAT, necesitaremos:
- **RFC del Emisor**: Tu identificación fiscal.
- **Certificado de Sello Digital (CSD)**: Archivos `.cer` y `.key` (no confundir con la e.firma).
- **Contraseña de la clave privada**: Para el sello digital.
- **Régimen Fiscal**: Ejemplo: 601 (General de Ley Personas Morales).

## 2. Checklist para el Cliente (Para Facturación Real)
Copia y envía esta lista a tu cliente. Estos son los requisitos técnicos indispensables para emitir facturas legales en México (CFDI 4.0):

1.  **RFC del Emisor**.
2.  **Certificado de Sello Digital (CSD)**: Los archivos `.cer` y `.key`. *Ojo: No es la e.firma (FIEL), son sellos específicos para facturar.*
3.  **Contraseña de la clave privada** de los CSD.
4.  **Razón Social**: Debe coincidir exactamente con la Constancia de Situación Fiscal (sin el tipo de sociedad, ej: "GASTRO SOLUTIONS").
5.  **Régimen Fiscal**: Clave del SAT (ej: 601 - General de Ley Personas Morales).
6.  **Código Postal**: El registrado ante el SAT.
7.  **Constancia de Situación Fiscal**: Actualizada (últimos 3 meses preferentemente).

---

## 3. Demo para el Cliente (Próximos Pasos)
Para la presentación del demo, podemos simular el flujo completo sin necesidad de sellos reales:

1.  **Dashboard de Facturación**: (Ya implementado) Vista general de ingresos y estatus de facturas.
2.  **Flujo de "Nueva Factura"**: Un formulario donde se capturan los datos del receptor (del cliente final).
3.  **Generación de XML/PDF Simulado**: Al dar click en "Timbrar", mostraremos una animación de carga y luego un mensaje de éxito con botones para descargar archivos de ejemplo.
4.  **Configuración de Cuenta**: Una pantalla donde el cliente vea dónde subiría sus sellos en el futuro.

---

## 4. Infraestructura de Facturación (PAC)
Para pasar a producción, configuraremos:
- **Facturama API**: Recomendado por su facilidad de integración y soporte en México.
- **Entorno Sandbox**: Usaremos claves de prueba para el demo para asegurar que el flujo sea 100% idéntico al real.

---
**¿Quieres que comencemos configurando un entorno de pruebas con algún PAC para mostrarte cómo funcionaría?**
