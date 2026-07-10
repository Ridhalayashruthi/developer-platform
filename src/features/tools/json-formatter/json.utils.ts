export function beautifyJSON(input: string) {
    return JSON.stringify(JSON.parse(input), null, 2);
  }
  
  export function minifyJSON(input: string) {
    return JSON.stringify(JSON.parse(input));
  }

  export function downloadJSON(content: string) {
    const blob = new Blob([content], {
      type: "application/json",
    });
  
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement("a");
  
    link.href = url;
    link.download = "formatted.json";
  
    link.click();
  
    URL.revokeObjectURL(url);
  }

  export function validateJSON(text: string) {
    try {
      JSON.parse(text);
  
      return {
        valid: true,
        error: "",
      };
    } catch (err) {
      return {
        valid: false,
        error: err instanceof Error ? err.message : "Invalid JSON",
      };
    }
  }