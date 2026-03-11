import { GetPageResponse } from "@notionhq/client";

export function Property({ propertyName, page }: { propertyName: string; page: GetPageResponse }) {

  if (!("properties" in page)) return null

  const prop = page.properties[propertyName]

  if (!prop) return <span>Property {propertyName} not found</span>

  if (prop.type === "rich_text") {
    return <span>{prop.rich_text[0]?.plain_text}</span>
  }

  if (prop.type === "title") {
    return <span>{prop.title[0]?.plain_text}</span>
  }

  if (prop.type === "number") {
    return <span>{prop.number}</span>
  }

  return <span>{JSON.stringify(prop)}</span>
}