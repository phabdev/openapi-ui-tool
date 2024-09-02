window.electron.loadYaml((yamlContent) => {
    try {
      // Clear the previous Swagger UI
      document.getElementById('swagger-ui').innerHTML = '';
  
      // Initialize a new Swagger UI instance
      SwaggerUIBundle({
        spec: yamlContent,
        dom_id: '#swagger-ui',
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        layout: "StandaloneLayout",
        plugins: [
          function HideTopbarPlugin() {
            return {
              components: {
                Topbar: function() {
                  return null;
                }
              }
            };
          }
        ]
      });
    } catch (error) {
      console.error('Error rendering Swagger-UI:', error);
      document.getElementById('swagger-ui').innerText = 'Failed to load the API documentation. Please check the YAML file.';
    }
  });
  