import type { SchemaObject } from "@/types/openapi"
import dynamic from "next/dynamic"
import Loading from "@/components/Loading"
import type { TagOperationParametersDefaultProps } from "../Default"
import { TagOperationParametersObjectProps } from "../Object"

const TagOperationParametersObject = dynamic<TagOperationParametersObjectProps>(
  async () => import("../Object"),
  {
    loading: () => <Loading />,
  }
) as React.FC<TagOperationParametersObjectProps>

const TagOperationParametersDefault =
  dynamic<TagOperationParametersDefaultProps>(
    async () => import("../Default"),
    {
      loading: () => <Loading />,
    }
  ) as React.FC<TagOperationParametersDefaultProps>

export type TagOperationParametersUnionProps = {
  name: string
  schema: SchemaObject
  isRequired?: boolean
}

const TagOperationParametersUnion = ({
  name,
  schema,
  isRequired,
}: TagOperationParametersUnionProps) => {
  const objectSchema = schema.anyOf
    ? schema.anyOf.find((item) => item.type === "object" && item.properties)
    : schema.allOf?.find((item) => item.type === "object" && item.properties)

  if (!objectSchema) {
    return (
      <TagOperationParametersDefault
        schema={schema}
        name={name}
        isRequired={isRequired}
        className="pl-1.5"
      />
    )
  }

  return <TagOperationParametersObject schema={objectSchema} name={name} />
}

export default TagOperationParametersUnion
