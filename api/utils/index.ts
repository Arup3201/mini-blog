function generateId(prefix = "") {
  return prefix + Math.random().toString(16).slice(2);
}

export { generateId };
