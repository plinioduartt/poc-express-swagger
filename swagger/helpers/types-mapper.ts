export const TypesMapper = (type: "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function"): string => {
  const mapper = {
    "string": 'string',
    "number": 'integer',
    "bigint": 'integer',
    "boolean": '',
    "symbol": '',
    "undefined": '',
    "object": 'object',
    "function": ''
  }
  return mapper[type]
}