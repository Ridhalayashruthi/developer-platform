export interface QuestionItem {
  id: string;
  topic: 'React' | 'JavaScript' | 'TypeScript' | 'System Design' | 'DSA';
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
] as const;
export const QUESTIONS: QuestionItem[] = [
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
    code: `// Always use stable unique IDs rather than array indices for dynamic lists{items.map((item) => (  <ListItem key={item.id} data={item} />))}`,
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
    code: `const isOnline = useSyncExternalStore(  (cb) => {    window.addEventListener("online", cb);    window.addEventListener("offline", cb);    return () => {      window.removeEventListener("online", cb);      window.removeEventListener("offline", cb);    };  },  () => navigator.onLine,  () => true);`,
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
    id: 'js-1',
    topic: 'JavaScript',
    difficulty: 'Intermediate',
    question:
      'Explain the difference between Microtasks and Macrotasks in the Event Loop.',
    answer:
      'JavaScript executes code on a single main thread using a Call Stack and two priority queues. After every synchronous stack frame finishes, the runtime completely drains the Microtask queue (Promise.then/catch/finally, queueMicrotask, MutationObserver) before taking a single task from the Macrotask queue (setTimeout, setInterval, I/O callbacks) or performing a browser layout repaint.',
    followUp:
      'What happens if a Promise recursively schedules another Promise forever? It starves the Macrotask queue and freezes browser rendering because microtasks must empty before the next frame paints.',
    code: `console.log("1: Sync");setTimeout(() => console.log("2: Macrotask"), 0);Promise.resolve().then(() => console.log("3: Microtask"));// Output order: 1: Sync -> 3: Microtask -> 2: Macrotask`,
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
    code: `function createCounter() {  let count = 0;  return {    increment: () => ++count,    value: () => count,  };}`,
  },
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
    code: `function parseInput(val: unknown): string {  if (typeof val === "string") {    return val.trim().toUpperCase();  }  throw new Error("Expected a string input");}`,
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
    code: `type RequestState<T> =  | { status: "loading" }  | { status: "success"; data: T }  | { status: "error"; message: string };`,
  },
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
    id: 'dsa-1',
    topic: 'DSA',
    difficulty: 'Beginner',
    question:
      'Why is a Hash Map preferred over nested loops for Two-Sum problems?',
    answer:
      'A brute-force nested loop checks every pair of indices, resulting in O(n²) quadratic time complexity that degrades rapidly on large arrays. By storing each visited element and its index in a Hash Map during a single pass, you can check whether (target - current) already exists in O(1) average time, reducing total runtime to O(n) linear time at the cost of O(n) auxiliary space.',
    followUp:
      'What if the input array is already sorted? You can use two pointers (left and right) to achieve O(n) time with O(1) extra space.',
    code: `function twoSum(nums: number[], target: number): [number, number] | [] {  const seen = new Map<number, number>();  for (let i = 0; i < nums.length; i++) {    const complement = target - nums[i];    if (seen.has(complement)) return [seen.get(complement)!, i];    seen.set(nums[i], i);  }  return [];}`,
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
];
