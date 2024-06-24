const objectStore = new Map();

export function generateObjectHash(obj: Object) {
  // Convert object to JSON string
  const jsonString = JSON.stringify(obj);

  // Simple hash function (djb2 algorithm)
  function hashString(str: string) {
    let hash = 5381;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) + hash + char; // hash * 33 + char
    }
    return hash >>> 0; // Ensure positive integer
  }

  // Generate hash
  const hash = hashString(jsonString).toString(16);

  // Store the object in the map with the hash as the key
  objectStore.set(hash, obj);

  return hash;
}

export function getObjectByHash(hash: string) {
  // Retrieve the object from the map using the hash
  return objectStore.get(hash);
}
