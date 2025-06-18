/* eslint-disable no-extra-semi */
/* eslint-disable no-unused-vars */
import "@testing-library/jest-dom"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { UpsertArticleForm } from "@/components/articles/upsert-article-form"
import { mockArticle } from "@/__mocks__/mocks-data"

jest.mock("@/app/_actions/tags/get-tags-list", () => ({
  getTagsListAction: jest.fn()
}))
jest.mock("@/app/_actions/articles/update-article", () => ({
  updateArticleAction: jest.fn()
}))
jest.mock("@/app/_actions/articles/create-article", () => ({
  createArticleAction: jest.fn()
}))
jest.mock("@/components/misc/editor", () => ({
  __esModule: true,
  default: ({
    value,
    onChange
  }: {
    value: string
    onChange: (value: string) => void
  }) => (
    <textarea
      data-testid="editor"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  )
}))

const mockPush = jest.fn()
const mockPrefetch = jest.fn()
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
    prefetch: mockPrefetch
  })
}))

jest.mock("sonner", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn()
  }
}))

jest.mock("@/components/misc/editor", () => {
  return function MockEditor({
    value,
    onChange
  }: {
    value: string
    onChange: (value: string) => void
  }) {
    return (
      <textarea
        data-testid="mock-editor"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="content"
      />
    )
  }
})

import { getTagsListAction } from "@/app/_actions/tags/get-tags-list"
import { updateArticleAction } from "@/app/_actions/articles/update-article"
import { toast } from "sonner"

const mockTagsList = [
  { id: 1, name: "React", bg_color_hex: "#61DAFB", text_color_hex: "#000000" },
  {
    id: 2,
    name: "Next.js",
    bg_color_hex: "#000000",
    text_color_hex: "#FFFFFF"
  },
  { id: 3, name: "Jest", bg_color_hex: "#C21325", text_color_hex: "#FFFFFF" }
]

describe("UpsertArticleForm", () => {
  const originalEnv = process.env

  beforeEach(() => {
    jest.clearAllMocks()
    ;(getTagsListAction as jest.Mock).mockResolvedValue({ tags: mockTagsList })
    ;(updateArticleAction as jest.Mock).mockResolvedValue({ success: true })

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 456 }),
        text: () => Promise.resolve(JSON.stringify({ id: 456 }))
      })
    ) as jest.Mock

    process.env = { ...originalEnv }
  })

  afterAll(() => {
    process.env = originalEnv
  })

  it("deve renderizar o formulário em modo de criação corretamente", async () => {
    render(<UpsertArticleForm />)

    await waitFor(() => {
      expect(getTagsListAction).toHaveBeenCalledTimes(1)
    })

    expect(
      screen.getByPlaceholderText("Insira o título...")
    ).toBeInTheDocument()
    expect(screen.getByLabelText("content")).toBeInTheDocument()
    expect(screen.getByText("Selecione até 4 tags")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: /publicar/i })
    ).toBeInTheDocument()
  })

  it("deve renderizar o formulário em modo de edição com valores preenchidos", async () => {
    render(<UpsertArticleForm article={mockArticle} />)

    await waitFor(() => {
      expect(getTagsListAction).toHaveBeenCalledTimes(1)
    })

    expect(screen.getByDisplayValue(mockArticle.title)).toBeInTheDocument()
    expect(
      screen.getByDisplayValue(mockArticle.body_markdown)
    ).toBeInTheDocument()

    expect(screen.getByAltText("Preview da imagem")).toHaveAttribute(
      "src",
      expect.stringContaining("image.jpg")
    )
  })

  it("deve atualizar um artigo existente quando o formulário é submetido", async () => {
    const user = userEvent.setup()
    render(<UpsertArticleForm article={mockArticle} />)

    await waitFor(() => expect(getTagsListAction).toHaveBeenCalled())

    const titleInput = screen.getByDisplayValue(mockArticle.title)
    await user.clear(titleInput)
    await user.type(titleInput, "Título Atualizado")

    await user.click(screen.getByRole("button", { name: /publicar/i }))

    await waitFor(() => {
      expect(updateArticleAction).toHaveBeenCalledWith({
        id: mockArticle.id.toString(),
        data: expect.objectContaining({
          article: expect.objectContaining({
            title: "Título Atualizado"
          })
        })
      })
    })

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith(
        "Artigo atualizado com sucesso!"
      )
      expect(mockPush).toHaveBeenCalledWith(`/articles/${mockArticle.id}`)
    })
  })

  // describe("com upload via S3 habilitado", () => {
  //   beforeEach(() => {
  //     process.env.NEXT_PUBLIC_USE_S3_BUCKET = "1"
  //   })

  //   it("should render the input for local file", async () => {
  //     render(<UpsertArticleForm />)
  //     await waitFor(() => expect(getTagsListAction).toHaveBeenCalled())

  //     const input = screen.getByTestId("cover-image-input-local")
  //     const all = screen.getAllByTestId("cover-image-input-local")
  //     console.log({ all })
  //     expect(input).toBeInTheDocument()
  //     expect(input).toHaveAttribute("type", "file")
  //   })
  // })

  describe("com upload via S3 desabilitado", () => {
    beforeEach(() => {
      process.env.NEXT_PUBLIC_USE_S3_BUCKET = "0"
    })

    it("should render the input for public URL", async () => {
      render(<UpsertArticleForm />)
      await waitFor(() => expect(getTagsListAction).toHaveBeenCalled())

      const input = screen.getByTestId("cover-image-input-public")

      expect(input).toBeInTheDocument()
      expect(input).toHaveAttribute("type", "text")
    })
  })
})
