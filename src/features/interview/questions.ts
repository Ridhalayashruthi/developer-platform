export interface QuestionItem {
  id: string;
  topic:
    | 'React'
    | 'JavaScript'
    | 'TypeScript'
    | 'System Design'
    | 'DSA'
    | 'Performance & Security';
  difficulty: 'Beginner' | 'Intermediate' | 'Senior';
  question: string;
  answer: string;
  followUp: string;
  code?: string;
  relatedTool?: { label: string; href: string };
}

export const TOPICS = [
  'All',
  'React',
  'JavaScript',
  'TypeScript',
  'System Design',
  'DSA',
  'Performance & Security',
] as const;

export const DIFFICULTIES = [
  'All',
  'Beginner',
  'Intermediate',
  'Senior',
] as const;

export const QUESTIONS: QuestionItem[] = [
  // ==========================================
  // REACT (8 Questions)
  // ==========================================
  {
    id: 'react-1',
    topic: 'React',
    difficulty: 'Intermediate',
    question:
      "How does React's reconciliation algorithm (Fiber) optimize DOM updates?",
    answer:
      'React Fiber splits rendering work into incremental units of work that can be paused, aborted, or prioritized based on user interaction urgency. When state changes, React compares the previous Virtual DOM tree with the newly rendered tree using two O(n) heuristics: elements of different types (e.g., <div> to <span>) tear down and rebuild the subtree, while stable key props let React match and reorder sibling elements without remounting state.',
    followUp:
      'Why does using an array index as a key break form inputs when items are prepended or sorted? Because React ties component state to the key—shifting indices causes state to attach to the wrong item.',
    code: `// Always use stable unique IDs rather than array indices for dynamic lists
{items.map((item) => (
  <ListItem key={item.id} data={item} />
))}`,
    relatedTool: {
      label: 'Generate UUID v4 keys',
      href: '/tools/uuid-generator',
    },
  },
  {
    id: 'react-2',
    topic: 'React',
    difficulty: 'Senior',
    question: 'When should you use useSyncExternalStore instead of useEffect?',
    answer:
      "useSyncExternalStore is purpose-built for subscribing to external mutable data sources outside React's state tree—such as browser media queries, localStorage, navigator.onLine, or third-party stores—while preventing visual tearing during concurrent rendering. In Next.js App Router, it also lets you supply a separate getServerSnapshot function to eliminate hydration mismatches cleanly without running a double-render inside useEffect.",
    followUp:
      'What happens if your getSnapshot function returns a newly allocated object on every call? React will enter an infinite re-render loop because Object.is comparison fails on every check.',
    code: `const isOnline = useSyncExternalStore(
  (cb) => {
    window.addEventListener("online", cb);
    window.addEventListener("offline", cb);
    return () => {
      window.removeEventListener("online", cb);
      window.removeEventListener("offline", cb);
    };
  },
  () => navigator.onLine,
  () => true
);`,
  },
  {
    id: 'react-3',
    topic: 'React',
    difficulty: 'Intermediate',
    question:
      'What is the difference between Next.js Server Components and Client Components?',
    answer:
      "React Server Components (RSC) execute exclusively on the server during build or request time, allowing direct database queries and secret access while shipping zero component JavaScript to the browser bundle. Client Components ('use client') hydrate in the browser to enable interactivity, event listeners, React hooks (useState, useEffect), and browser-only APIs.",
    followUp:
      'Can a Client Component import a Server Component directly? No—importing it turns it into a Client Component. Instead, pass the Server Component as a children or prop slot.',
  },
  {
    id: 'react-4',
    topic: 'React',
    difficulty: 'Intermediate',
    question:
      'When do useMemo and useCallback actually improve performance, and when do they hurt?',
    answer:
      'useMemo caches the result of an expensive computation, while useCallback preserves referential equality for function props passed to memoized child components (React.memo) or dependency arrays. Wrapping trivial calculations or unmemoized children adds memory overhead and dependency comparison cost on every render without preventing DOM work.',
    followUp:
      'Why does passing a new inline arrow function to a React.memo child defeat memoization? Because Object.is(prevProps.onClick, nextProps.onClick) returns false whenever a fresh closure is created.',
    code: `const handleSelect = useCallback((id: string) => {
  setSelectedId(id);
}, []);

const sortedRows = useMemo(
  () => [...rows].sort((a, b) => a.score - b.score),
  [rows]
);`,
  },
  {
    id: 'react-5',
    topic: 'React',
    difficulty: 'Senior',
    question:
      'How do useTransition and useDeferredValue keep the UI responsive during heavy updates?',
    answer:
      'Both hooks mark state updates as non-urgent concurrent transitions so React can interrupt rendering if the user types or clicks. useTransition wraps the state setter directly (giving you an isPending flag), whereas useDeferredValue wraps a received value or prop when you do not own the state setter.',
    followUp:
      'What happens to intermediate renders if the user types five characters rapidly during a transition? React abandons stale in-progress renders and commits only the latest state.',
    code: `const [isPending, startTransition] = useTransition();

const onSearchChange = (value: string) => {
  setInput(value); // Urgent: updates input box immediately
  startTransition(() => {
    setFilteredQuery(value); // Non-urgent: interruptible list filter
  });
};`,
  },
  {
    id: 'react-6',
    topic: 'React',
    difficulty: 'Beginner',
    question:
      'Why must React state updates be treated as immutable instead of mutating objects or arrays in place?',
    answer:
      'React determines whether state has changed by comparing previous and next references using Object.is. Mutating an existing object or array keeps the same memory reference, causing React to bail out of re-rendering and breaking time-travel debugging, memoization, and concurrent rendering assumptions.',
    followUp:
      'How do you update a deeply nested property cleanly without mutating state? Spread each ancestor level along the update path or use structuredClone / Immer.',
    code: `// Correct: creates a new array and updated object reference
setTodos((prev) =>
  prev.map((todo) =>
    todo.id === targetId ? { ...todo, completed: !todo.completed } : todo
  )
);`,
  },
  {
    id: 'react-7',
    topic: 'React',
    difficulty: 'Senior',
    question:
      'What causes React hydration mismatches in Next.js, and how do you resolve them properly?',
    answer:
      'A hydration mismatch occurs when the HTML generated on the server differs from the initial Virtual DOM tree rendered on the client—commonly caused by reading window, localStorage, Date.now(), Math.random(), or browser timezone formatting during the first render pass. Fix it by moving browser-dependent reads into useEffect, using useSyncExternalStore with a deterministic server snapshot, or formatting dates in a fixed UTC timezone.',
    followUp:
      'Why is suppressHydrationWarning only a last resort? It silences the warning on a single text attribute (like timestamps) but does not fix structural DOM mismatches.',
  },
  {
    id: 'react-8',
    topic: 'React',
    difficulty: 'Intermediate',
    question:
      'How do React Error Boundaries work, and what errors do they NOT catch?',
    answer:
      'Error Boundaries are class components implementing static getDerivedStateFromError and componentDidCatch that catch JavaScript exceptions thrown during rendering, lifecycle methods, and constructors of their child component tree, rendering a fallback UI instead of crashing the whole app. They do not catch errors inside event handlers, asynchronous callbacks (setTimeout, Promises), server-side rendering, or errors thrown inside the boundary itself.',
    followUp:
      'How do you handle async or event-handler errors inside a boundary? Catch them in try/catch and store the error in state so it re-throws during the next render cycle.',
  },

  // ==========================================
  // JAVASCRIPT (8 Questions)
  // ==========================================
  {
    id: 'js-1',
    topic: 'JavaScript',
    difficulty: 'Intermediate',
    question:
      'Explain the difference between Microtasks and Macrotasks in the Event Loop.',
    answer:
      'JavaScript executes code on a single main thread using a Call Stack and two priority queues. After every synchronous stack frame finishes, the runtime completely drains the Microtask queue (Promise.then/catch/finally, queueMicrotask, MutationObserver) before taking a single task from the Macrotask queue (setTimeout, setInterval, I/O callbacks) or performing a browser layout repaint.',
    followUp:
      'What happens if a Promise recursively schedules another Promise forever? It starves the Macrotask queue and freezes browser rendering because microtasks must empty before the next frame paints.',
    code: `console.log("1: Sync");
setTimeout(() => console.log("2: Macrotask"), 0);
Promise.resolve().then(() => console.log("3: Microtask"));
// Output order: 1: Sync -> 3: Microtask -> 2: Macrotask`,
  },
  {
    id: 'js-2',
    topic: 'JavaScript',
    difficulty: 'Beginner',
    question:
      'How do closures work in JavaScript, and how can they cause memory leaks?',
    answer:
      'A closure is created whenever a function retains lexical access to variables from its outer enclosing scope even after that outer function has returned. Closures power private state encapsulation, factory functions, and debouncing, but if an event listener or interval holds a closure referencing a large DOM node or array, the garbage collector cannot reclaim that memory until the listener is removed.',
    followUp:
      'How do you prevent closure-related leaks in React? Always return a cleanup function from useEffect that clears timers, AbortControllers, and window listeners.',
    code: `function createCounter() {
  let count = 0;
  return {
    increment: () => ++count,
    value: () => count,
  };
}`,
  },
  {
    id: 'js-3',
    topic: 'JavaScript',
    difficulty: 'Intermediate',
    question:
      'Compare Promise.all, Promise.allSettled, Promise.race, and Promise.any.',
    answer:
      'Promise.all resolves when every input promise fulfills and short-circuits immediately on the first rejection. Promise.allSettled waits for all promises to finish and returns an array of { status, value | reason } objects without short-circuiting. Promise.race settles with the very first promise to either fulfill or reject, whereas Promise.any resolves with the first fulfilled promise and only rejects with an AggregateError if every promise rejects.',
    followUp:
      'Which combinator should you use when loading independent dashboard widgets where one failed API should not blank the entire screen? Promise.allSettled.',
    code: `const results = await Promise.allSettled([
  fetch("/api/profile"),
  fetch("/api/notifications"),
]);
const fulfilled = results.filter((r) => r.status === "fulfilled");`,
  },
  {
    id: 'js-4',
    topic: 'JavaScript',
    difficulty: 'Intermediate',
    question:
      'How do debounce and throttle differ, and when should you use each?',
    answer:
      'Debouncing delays executing a function until a specified quiet period has elapsed since the last invocation—ideal for search autocomplete inputs or window resize recalculations. Throttling guarantees a function executes at most once every N milliseconds during continuous activity—ideal for scroll progress tracking, drag handlers, or rate-limiting button clicks.',
    followUp:
      'How do you cancel a pending debounced call when a component unmounts? Store the timer ID in a ref and call clearTimeout inside a useEffect cleanup.',
    code: `function debounce<T extends (...args: unknown[]) => void>(fn: T, delay: number) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}`,
  },
  {
    id: 'js-5',
    topic: 'JavaScript',
    difficulty: 'Senior',
    question:
      'How does prototypal inheritance work under the hood in JavaScript?',
    answer:
      'Every JavaScript object has an internal [[Prototype]] link pointing to another object (or null at the end of the chain). When accessing a property, the engine checks the object itself first and walks up the prototype chain until it finds the property or reaches Object.prototype. ES6 class syntax is syntactic sugar over constructor functions and Object.create prototype delegation.',
    followUp:
      'Why is Object.create(null) useful for lookup dictionaries? It creates a pure hash map with no inherited keys like toString or constructor that could collide with user input.',
  },
  {
    id: 'js-6',
    topic: 'JavaScript',
    difficulty: 'Beginner',
    question:
      'How is the value of "this" determined across regular functions, arrow functions, and class methods?',
    answer:
      'In regular functions, "this" is dynamically bound at call time based on how the function is invoked (object method call, explicit call/apply/bind, new constructor, or undefined in strict standalone calls). Arrow functions do not have their own "this" binding; they lexically capture "this" from the surrounding scope where they were defined.',
    followUp:
      'What happens if you use .bind() or .call() on an arrow function? It has no effect on "this" because lexical binding cannot be overridden.',
  },
  {
    id: 'js-7',
    topic: 'JavaScript',
    difficulty: 'Intermediate',
    question:
      'What is the difference between shallow copy and deep copy, and what are the limitations of structuredClone?',
    answer:
      'A shallow copy (spread syntax {...obj} or Object.assign) duplicates only top-level properties while nested objects still share references with the original. A deep copy recursively clones all nested structures; native structuredClone() handles circular references, Maps, Sets, Dates, and ArrayBuffers, but throws a DataCloneError on functions, DOM nodes, and class prototype methods.',
    followUp:
      'Why is JSON.parse(JSON.stringify(obj)) risky for deep cloning? It silently drops undefined, functions, and Symbols, converts Dates to strings, and throws on circular references.',
  },
  {
    id: 'js-8',
    topic: 'JavaScript',
    difficulty: 'Senior',
    question:
      'How do WeakMap and WeakSet help prevent memory leaks compared to Map and Set?',
    answer:
      'WeakMap and WeakSet hold weak references to object keys, meaning if no other strong reference to that object exists in your program, the garbage collector can automatically reclaim both the key and its associated metadata. Because keys can be collected at any moment, WeakMap and WeakSet are not iterable and do not expose a .size property.',
    followUp:
      'What is a classic real-world use case for WeakMap? Caching computed metadata or DOM node state tied to specific DOM elements without leaking memory when elements are removed.',
  },

  // ==========================================
  // TYPESCRIPT (7 Questions)
  // ==========================================
  {
    id: 'ts-1',
    topic: 'TypeScript',
    difficulty: 'Intermediate',
    question:
      "What is the difference between 'unknown' and 'any' in TypeScript?",
    answer:
      "'any' opts out of the TypeScript type checker completely, allowing arbitrary property access and assignments that can fail at runtime. 'unknown' is the type-safe top type: any value can be assigned to unknown, but TypeScript forbids calling methods or reading properties on it until you narrow the type using typeof, instanceof, discriminated unions, or a custom type predicate.",
    followUp:
      "Where is 'unknown' especially valuable in full-stack apps? Typing external API responses (await res.json()) and catch(error: unknown) blocks before runtime validation.",
    code: `function parseInput(val: unknown): string {
  if (typeof val === "string") {
    return val.trim().toUpperCase();
  }
  throw new Error("Expected a string input");
}`,
    relatedTool: {
      label: 'Validate API JSON payloads',
      href: '/tools/json-formatter',
    },
  },
  {
    id: 'ts-2',
    topic: 'TypeScript',
    difficulty: 'Senior',
    question:
      'How do Discriminated Unions improve state modeling in React applications?',
    answer:
      "A discriminated union combines multiple object types that share a common literal property (the discriminant, such as status: 'idle' | 'loading' | 'success' | 'error'). Unlike separate boolean flags (isLoading, isError, data) that allow impossible states, discriminated unions enforce exhaustive narrowing in switch statements so invalid combinations are caught at compile time.",
    followUp:
      "How do you guarantee exhaustive handling of every union member? Assign the default branch to a variable of type 'never'.",
    code: `type RequestState<T> =
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };`,
  },
  {
    id: 'ts-3',
    topic: 'TypeScript',
    difficulty: 'Intermediate',
    question:
      'What are TypeScript Generics and how do generic constraints (extends) work?',
    answer:
      'Generics parameterize types over functions, interfaces, and classes so reusable logic preserves exact input-to-output type relationships instead of falling back to any. Adding an extends constraint (e.g., <T extends { id: string }>) restricts callers to types satisfying that shape while keeping all extra properties intact on the returned type.',
    followUp:
      'How does keyof work with generics for type-safe property lookups? <T, K extends keyof T>(obj: T, key: K): T[K] guarantees the key exists on T and returns its exact property type.',
    code: `function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}`,
  },
  {
    id: 'ts-4',
    topic: 'TypeScript',
    difficulty: 'Intermediate',
    question:
      'When should you choose type aliases vs. interfaces in TypeScript?',
    answer:
      'Interfaces excel at defining object contracts and class implementations and support declaration merging (useful for augmenting third-party library types). Type aliases are required for unions, intersections, mapped types, conditional types, and tuple definitions. For standard React props and API DTOs, pick one convention consistently across the codebase.',
    followUp:
      'Which tends to give clearer compiler errors and faster type-checking on large object hierarchies? Interfaces, because TypeScript caches interface names rather than expanding inline object intersections.',
  },
  {
    id: 'ts-5',
    topic: 'TypeScript',
    difficulty: 'Senior',
    question:
      'How do conditional types and the "infer" keyword work in TypeScript?',
    answer:
      'Conditional types follow the ternary form T extends U ? X : Y to select types based on assignability. Inside the extends clause, the infer keyword declares a type variable that extracts an inner type—such as unwrapping a Promise resolution value (Awaited<T>) or extracting a function return type (ReturnType<T>).',
    followUp:
      'Why do conditional types distribute over union types? When T is a naked type parameter (e.g., T extends string ? ...), TypeScript applies the check to each union member individually.',
    code: `type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type UserData = UnwrapPromise<Promise<{ id: string; name: string }>>;`,
  },
  {
    id: 'ts-6',
    topic: 'TypeScript',
    difficulty: 'Beginner',
    question:
      'How do core Utility Types (Partial, Pick, Omit, Record, Readonly) reduce boilerplate?',
    answer:
      'Built-in utility types transform existing domain models without duplicating field definitions: Partial<T> makes all fields optional (great for PATCH payloads), Pick<T, K> selects a subset of keys, Omit<T, K> excludes sensitive fields like passwordHash, Record<K, V> types dictionary maps, and Readonly<T> prevents accidental property mutation.',
    followUp:
      'How would you create a type where only two specific fields are optional while the rest remain required? Omit<User, "bio" | "avatar"> & Partial<Pick<User, "bio" | "avatar">>.',
  },
  {
    id: 'ts-7',
    topic: 'TypeScript',
    difficulty: 'Intermediate',
    question:
      'What does the "satisfies" operator solve compared to a traditional type annotation?',
    answer:
      'A standard annotation (const palette: Record<string, string | number[]>) widens the variable to the broad union type, losing exact key and value specificity. The satisfies operator validates that an expression conforms to a target type at compile time while preserving the narrow inferred literal types for autocomplete and property access.',
    followUp:
      'Give a practical example where satisfies shines: Validating a route or theme configuration object so typos fail immediately while still allowing palette.primary.toUpperCase() without type narrowing.',
    code: `const routes = {
  home: "/",
  jwt: "/tools/jwt-decoder",
} satisfies Record<string, \`/\${string}\`>;
// routes.jwt keeps literal type "/tools/jwt-decoder"`,
  },

  // ==========================================
  // SYSTEM DESIGN (7 Questions)
  // ==========================================
  {
    id: 'sd-1',
    topic: 'System Design',
    difficulty: 'Senior',
    question: 'How do you prevent rate-limit abuse on a public REST API?',
    answer:
      'Place an API Gateway or reverse proxy in front of your services using a Token Bucket or Sliding Window Log algorithm backed by an in-memory Redis store keyed by API key, user ID, or IP subnet. When a client exceeds its quota, immediately reject requests with HTTP 429 Too Many Requests along with X-RateLimit-Remaining and Retry-After headers, while offloading idempotent GET traffic to a CDN edge cache.',
    followUp:
      'Why is Sliding Window preferred over Fixed Window? Fixed windows allow a burst of 2x traffic right across the minute boundary (e.g., 11:59:59 and 12:00:01).',
  },
  {
    id: 'sd-2',
    topic: 'System Design',
    difficulty: 'Senior',
    question:
      'How does stateless JWT authentication work, and how do you handle token revocation?',
    answer:
      'In stateless authentication, an identity provider signs a short-lived JSON Web Token containing user claims and an expiration timestamp. Downstream microservices verify the signature locally using a shared secret or public key without hitting a database on every request. To support instant logout or revocation, pair short-lived access tokens (5–15 minutes) with revocable HTTP-only refresh tokens stored in Redis or a database.',
    followUp:
      'Why should JWTs never be stored in localStorage for sensitive apps? Any third-party XSS script can read localStorage, whereas HttpOnly Secure SameSite cookies block JavaScript access.',
    relatedTool: {
      label: 'Inspect tokens in JWT Decoder',
      href: '/tools/jwt-decoder',
    },
  },
  {
    id: 'sd-3',
    topic: 'System Design',
    difficulty: 'Intermediate',
    question:
      'Compare SSR, SSG, ISR, and CSR in Next.js—how do you choose the right rendering strategy per route?',
    answer:
      'Static Site Generation (SSG) pre-renders HTML at build time for maximum CDN speed on marketing or docs pages. Incremental Static Regeneration (ISR) revalidates cached static pages in the background after a TTL for semi-dynamic content like blogs or product catalogs. Server-Side Rendering (SSR) renders fresh HTML per request for personalized or SEO-critical pages, while Client-Side Rendering (CSR) fits private, highly interactive dashboards behind login.',
    followUp:
      'How does stale-while-revalidate caching improve user latency? Users receive the cached page instantaneously while the server regenerates an updated version asynchronously for subsequent visitors.',
  },
  {
    id: 'sd-4',
    topic: 'System Design',
    difficulty: 'Senior',
    question:
      'How do you design a Cache-Aside strategy with Redis, and how do you prevent cache stampedes?',
    answer:
      'In Cache-Aside, the application checks Redis first; on a cache miss, it queries the primary database, writes the serialized result back to Redis with a TTL, and invalidates or updates the key on writes. To prevent a cache stampede when a popular key expires under heavy traffic, use per-key distributed locking (single-flight), probabilistic early expiration, and jittered TTLs.',
    followUp:
      'What is cache penetration and how do you stop it? Repeated queries for non-existent IDs bypass the cache—prevent it by caching null sentinel values with a short TTL or checking a Bloom filter.',
  },
  {
    id: 'sd-5',
    topic: 'System Design',
    difficulty: 'Intermediate',
    question:
      'Compare REST, GraphQL, and tRPC for a modern TypeScript full-stack application.',
    answer:
      'REST offers simple HTTP caching, predictable resource URLs, and broad third-party compatibility. GraphQL solves over-fetching and under-fetching across complex relational graphs with a single typed endpoint, at the cost of query complexity limits and custom caching. tRPC eliminates schema codegen by sharing end-to-end TypeScript types directly between a Next.js/Node backend and frontend monorepo.',
    followUp:
      'When would you avoid tRPC? When exposing public APIs to external consumers or non-TypeScript mobile clients.',
  },
  {
    id: 'sd-6',
    topic: 'System Design',
    difficulty: 'Intermediate',
    question:
      'Why is cursor-based pagination preferred over offset-based pagination for infinite feeds?',
    answer:
      'Offset pagination (LIMIT 20 OFFSET 10000) forces the database to scan and discard 10,000 rows on every page and causes duplicate or skipped items when new rows are inserted mid-scroll. Cursor-based pagination uses an indexed opaque pointer (such as created_at + id) in a WHERE clause, delivering consistent O(log n) index seeks and stable ordering even under real-time inserts.',
    followUp:
      'How should a cursor token be formatted for clients? Base64-encode a JSON payload containing the sort key and tie-breaker ID so clients treat it as an opaque string.',
    relatedTool: {
      label: 'Encode/Decode cursor strings',
      href: '/tools/base64',
    },
  },
  {
    id: 'sd-7',
    topic: 'System Design',
    difficulty: 'Senior',
    question:
      'How do you design idempotent payment or webhook endpoints so retries never double-charge users?',
    answer:
      'Require clients to send a unique Idempotency-Key (such as a UUID v4) in the request header. On arrival, check an atomic Redis or database table keyed by (user_id, idempotency_key): if the key is already completed, return the stored HTTP response immediately; if in-flight, return 409 Conflict; otherwise execute the transaction and persist the result inside the same database commit.',
    followUp:
      'Why must the idempotency record be saved in the same database transaction as the payment state change? So a crash after charging cannot lose the idempotency record on retry.',
    relatedTool: {
      label: 'Generate Idempotency UUIDs',
      href: '/tools/uuid-generator',
    },
  },

  // ==========================================
  // DSA (6 Questions)
  // ==========================================
  {
    id: 'dsa-1',
    topic: 'DSA',
    difficulty: 'Beginner',
    question:
      'Why is a Hash Map preferred over nested loops for Two-Sum problems?',
    answer:
      'A brute-force nested loop checks every pair of indices, resulting in O(n²) quadratic time complexity that degrades rapidly on large arrays. By storing each visited element and its index in a Hash Map during a single pass, you can check whether (target - current) already exists in O(1) average time, reducing total runtime to O(n) linear time at the cost of O(n) auxiliary space.',
    followUp:
      'What if the input array is already sorted? You can use two pointers (left and right) to achieve O(n) time with O(1) extra space.',
    code: `function twoSum(nums: number[], target: number): [number, number] | [] {
  const seen = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (seen.has(complement)) return [seen.get(complement)!, i];
    seen.set(nums[i], i);
  }
  return [];
}`,
  },
  {
    id: 'dsa-2',
    topic: 'DSA',
    difficulty: 'Intermediate',
    question:
      'When should you apply the Sliding Window pattern on strings or arrays?',
    answer:
      'Use the Sliding Window technique whenever a problem asks for the longest, shortest, or optimal contiguous subarray or substring satisfying a constraint (such as longest substring without repeating characters or minimum window substring). Expanding a right pointer while shrinking a left pointer avoids re-evaluating overlapping elements, turning O(n²) brute-force scans into O(n) linear solutions.',
    followUp:
      'What data structures commonly track window state? A frequency Hash Map, Set, or fixed 26-element character count array.',
  },
  {
    id: 'dsa-3',
    topic: 'DSA',
    difficulty: 'Intermediate',
    question:
      'How do you implement an LRU Cache with O(1) get and put operations in JavaScript/TypeScript?',
    answer:
      'Combine a Hash Map for O(1) key lookup with a Doubly Linked List to maintain recency order in O(1) pointer updates. In JavaScript, the built-in Map preserves insertion order, allowing you to delete and re-insert an accessed key to move it to the most-recently-used end and evict map.keys().next().value when capacity is exceeded.',
    followUp:
      'Why does a Singly Linked List fail to achieve O(1) eviction? Removing an arbitrary middle node requires a pointer to its previous node, which takes O(n) traversal without back-pointers.',
    code: `class LRUCache<K, V> {
  private cache = new Map<K, V>();
  constructor(private capacity: number) {}

  get(key: K): V | undefined {
    if (!this.cache.has(key)) return undefined;
    const val = this.cache.get(key)!;
    this.cache.delete(key);
    this.cache.set(key, val);
    return val;
  }

  put(key: K, value: V): void {
    if (this.cache.has(key)) this.cache.delete(key);
    this.cache.set(key, value);
    if (this.cache.size > this.capacity) {
      const oldest = this.cache.keys().next().value!;
      this.cache.delete(oldest);
    }
  }
}`,
  },
  {
    id: 'dsa-4',
    topic: 'DSA',
    difficulty: 'Beginner',
    question:
      'How do you validate balanced brackets or nested HTML/JSON delimiters using a Stack?',
    answer:
      'Iterate through the string and push every opening delimiter ((, {, [) onto a LIFO stack. Whenever a closing delimiter appears, pop the top element from the stack and verify it matches the corresponding opener; if the stack is empty on a closer or non-empty at the end of the string, the input is invalid. This runs in O(n) time and O(n) worst-case space.',
    followUp:
      'How can you optimize space if there is only one type of parenthesis? Replace the stack with a single integer counter that increments on "(" and decrements on ")", ensuring it never drops below zero.',
  },
  {
    id: 'dsa-5',
    topic: 'DSA',
    difficulty: 'Intermediate',
    question:
      'Compare BFS (Breadth-First Search) and DFS (Depth-First Search) on trees and graphs.',
    answer:
      'BFS explores nodes level by level using a FIFO Queue, guaranteeing the shortest path in unweighted graphs and finding shallow targets quickly at the cost of O(w) maximum width memory. DFS explores as deep as possible along each branch using recursion or an explicit Stack, using O(h) height memory and excelling at topological sorting, cycle detection, and backtracking.',
    followUp:
      'Why should you maintain a visited Set in graph traversals but not in trees? Trees are acyclic directed hierarchies, whereas graphs can contain cycles that would cause infinite loops.',
  },
  {
    id: 'dsa-6',
    topic: 'DSA',
    difficulty: 'Senior',
    question:
      'How do you recognize and solve Dynamic Programming problems using Memoization vs. Tabulation?',
    answer:
      'A problem fits Dynamic Programming when it exhibits overlapping subproblems and optimal substructure (e.g., coin change, longest common subsequence, edit distance). Top-down memoization writes the natural recursive recurrence and caches results in a Map/array, whereas bottom-up tabulation fills an iterative DP table from base cases upward, avoiding call-stack overflow and enabling O(1) space optimization.',
    followUp:
      'When can you compress a 2D DP table down to a 1D array? Whenever row i depends only on row i - 1.',
  },

  // ==========================================
  // PERFORMANCE & SECURITY (4 Questions)
  // ==========================================
  {
    id: 'ps-1',
    topic: 'Performance & Security',
    difficulty: 'Intermediate',
    question:
      'What are the three Core Web Vitals (LCP, INP, CLS), and how do you optimize each?',
    answer:
      'Largest Contentful Paint (LCP <= 2.5s) measures main hero content load speed—optimize via priority image preloading, SSR/CDN caching, and eliminating render-blocking scripts. Interaction to Next Paint (INP <= 200ms) measures input responsiveness—optimize by breaking up long main-thread tasks and using startTransition. Cumulative Layout Shift (CLS <= 0.1) measures visual stability—prevent by reserving explicit width/height dimensions on images, fonts, and ad/embed containers.',
    followUp:
      'Why did INP replace First Input Delay (FID)? FID only measured the delay before the very first interaction began, whereas INP measures the full latency of all clicks, taps, and key presses across the entire page lifecycle.',
  },
  {
    id: 'ps-2',
    topic: 'Performance & Security',
    difficulty: 'Senior',
    question:
      'How do XSS and CSRF attacks work, and what modern defenses neutralize both?',
    answer:
      'Cross-Site Scripting (XSS) injects malicious JavaScript into a trusted page to steal tokens or act as the user—prevented by React JSX auto-escaping, sanitizing any rich HTML with DOMPurify, and enforcing a strict Content-Security-Policy (CSP) header. Cross-Site Request Forgery (CSRF) tricks a logged-in browser into sending unintended state-changing requests—prevented by SameSite=Lax/Strict cookies, anti-CSRF tokens, and verifying Origin/Referer headers.',
    followUp:
      'Why is dangerouslySetInnerHTML dangerous with user-generated Markdown or HTML? React bypasses escaping and inserts raw DOM markup, executing any embedded <script> or onerror handlers.',
  },
  {
    id: 'ps-3',
    topic: 'Performance & Security',
    difficulty: 'Intermediate',
    question:
      'How does CORS (Cross-Origin Resource Sharing) work, and what triggers a preflight OPTIONS request?',
    answer:
      'CORS is a browser-enforced security mechanism that restricts web pages from reading responses from a different origin (scheme + domain + port) unless the server explicitly permits it via Access-Control-Allow-Origin headers. Browsers automatically send a preflight HTTP OPTIONS request before non-simple requests—such as PUT/DELETE methods, custom headers like Authorization, or application/json payloads.',
    followUp:
      'Does CORS protect your backend API from curl or Postman scripts? No—CORS is strictly enforced by web browsers; server-side authentication and rate limiting must still protect every endpoint.',
  },
  {
    id: 'ps-4',
    topic: 'Performance & Security',
    difficulty: 'Beginner',
    question:
      'How do you reduce JavaScript bundle size and improve initial load time in Next.js?',
    answer:
      'Keep data-fetching and heavy formatting logic inside Server Components so their dependencies never ship to the client, use next/dynamic to lazy-load heavy modals or charts on demand, replace bloated utility libraries with native Web APIs or tree-shakeable ESM imports, and analyze chunk composition with @next/bundle-analyzer.',
    followUp:
      'What happens when you import a single icon from a barrel file (index.ts) that lacks sideEffects: false? Bundlers may pull the entire icon library into your client chunk unless modular imports are configured.',
  },
];
