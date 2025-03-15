export default ({ app }) => {
  if (process.client) {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", "G-TS880P51YL"); // Используй свой ID Google Analytics

    // Динамически загружаем скрипт Google Analytics
    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-TS880P51YL";
    document.head.appendChild(script);
  }
};
