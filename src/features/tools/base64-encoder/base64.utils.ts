export function encodeBase64(text: string) {
    return btoa(unescape(encodeURIComponent(text)));
  }
  
  export function decodeBase64(text: string) {
    return decodeURIComponent(escape(atob(text)));
  }
  
  export function downloadText(text: string) {
    const blob = new Blob([text], { type: 'text/plain' });
  
    const url = URL.createObjectURL(blob);
  
    const a = document.createElement('a');
  
    a.href = url;
    a.download = 'base64-output.txt';
  
    a.click();
  
    URL.revokeObjectURL(url);
  }