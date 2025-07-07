export default {
  onPageLoad() {
    const html = document.documentElement;
    
    const colorMappings = [
      // Primary color: Blue to Custom Pantone (no change needed - CSS handles this)
      // Secondary colors: Sky/Cyan to Emerald  
      { from: "text-sky-", to: "text-emerald-" },
      { from: "bg-sky-", to: "bg-emerald-" },
      { from: "border-sky-", to: "border-emerald-" },
      { from: "border-l-sky-", to: "border-l-emerald-" },
      { from: "border-r-sky-", to: "border-r-emerald-" },
      { from: "border-t-sky-", to: "border-t-emerald-" },
      { from: "border-b-sky-", to: "border-b-emerald-" },
      { from: "outline-sky-", to: "outline-emerald-" },
      { from: "ring-sky-", to: "ring-emerald-" },
      
      { from: "text-cyan-", to: "text-emerald-" },
      { from: "bg-cyan-", to: "bg-emerald-" },
      { from: "border-cyan-", to: "border-emerald-" },
      { from: "border-l-cyan-", to: "border-l-emerald-" },
      { from: "border-r-cyan-", to: "border-r-emerald-" },
      { from: "border-t-cyan-", to: "border-t-emerald-" },
      { from: "border-b-cyan-", to: "border-b-emerald-" },
      { from: "outline-cyan-", to: "outline-emerald-" },
      { from: "ring-cyan-", to: "ring-emerald-" },
      
      // Interactive states for primary (blue stays as blue in classes, CSS overrides the colors)
      { from: "focus:ring-blue-", to: "focus:ring-blue-" }, // Keep class name, CSS handles color
      { from: "focus:outline-blue-", to: "focus:outline-blue-" }, // Keep class name, CSS handles color
      { from: "hover:bg-blue-", to: "hover:bg-blue-" }, // Keep class name, CSS handles color
      { from: "hover:text-blue-", to: "hover:text-blue-" }, // Keep class name, CSS handles color
      { from: "hover:border-blue-", to: "hover:border-blue-" }, // Keep class name, CSS handles color
      { from: "focus:border-blue-", to: "focus:border-blue-" }, // Keep class name, CSS handles color
      { from: "focus:border-l-blue-", to: "focus:border-l-blue-" }, // Keep class name, CSS handles color
      
      // Neutral colors: Stone to Slate
      { from: "text-stone-", to: "text-slate-" },
      { from: "bg-stone-", to: "bg-slate-" },
      { from: "border-stone-", to: "border-slate-" },
      { from: "border-l-stone-", to: "border-l-slate-" },
      { from: "border-r-stone-", to: "border-r-slate-" },
      { from: "border-t-stone-", to: "border-t-slate-" },
      { from: "border-b-stone-", to: "border-b-slate-" },
      { from: "outline-stone-", to: "outline-slate-" },
      { from: "ring-stone-", to: "ring-slate-" },
      
      // Gray variations (ensuring consistency)
      { from: "text-gray-", to: "text-slate-" },
      { from: "bg-gray-", to: "bg-slate-" },
      { from: "border-gray-", to: "border-slate-" },
      { from: "border-l-gray-", to: "border-l-slate-" },
      { from: "border-r-gray-", to: "border-r-slate-" },
      { from: "border-t-gray-", to: "border-t-slate-" },
      { from: "border-b-gray-", to: "border-b-slate-" },
      { from: "outline-gray-", to: "outline-slate-" },
      { from: "ring-gray-", to: "ring-slate-" },
    ];

    // Function to apply color overrides to an element
    const applyColorOverrides = (element) => {
      if (!element.classList) return;
      
      const original = [...element.classList];
      let changed = false;
      
      original.forEach((cls) => {
        for (const { from, to } of colorMappings) {
          if (cls.startsWith(from)) {
            const newClass = cls.replace(from, to);
            element.classList.replace(cls, newClass);
            changed = true;
          }
        }
      });
      
      // Handle hover and focus states that might be in style attributes
      if (element.style.cssText) {
        let cssText = element.style.cssText;
        colorMappings.forEach(({ from, to }) => {
          const fromColor = from.replace('-', '');
          const toColor = to.replace('-', '');
          cssText = cssText.replace(new RegExp(fromColor, 'g'), toColor);
        });
        if (cssText !== element.style.cssText) {
          element.style.cssText = cssText;
          changed = true;
        }
      }
    };

    // Apply to all existing elements
    document.querySelectorAll("[class]").forEach(applyColorOverrides);

    // Set up MutationObserver for dynamically added content
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            // Apply to the node itself
            applyColorOverrides(node);
            // Apply to all children with classes
            node.querySelectorAll && node.querySelectorAll("[class]").forEach(applyColorOverrides);
          }
        });
      });
    });

    // Start observing
    observer.observe(document.body, { 
      childList: true, 
      subtree: true 
    });

    console.log("[MyST override.mjs] Custom Pantone primary and Emerald secondary theme with Slate neutrals applied successfully.");
  },
};
