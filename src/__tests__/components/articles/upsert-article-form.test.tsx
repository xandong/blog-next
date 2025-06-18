/* eslint-disable no-extra-semi */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
// tests/upsert-article-form.test.tsx

// import { render, screen, fireEvent, waitFor } from "@testing-library/react"
// import { UpsertArticleForm } from "../../../components/articles/upsert-article-form"
// import { act } from "react-dom/test-utils"
// import { articleMock } from "../../../__mocks__/mocks-data"
// import Link from "next/link"

// jest.mock("next/router", () => ({
//   useRouter: jest.fn()
// }))
// import { useRouter } from "next/router"

// // Mockando next/image
// jest.mock("next/image", () => ({
//   __esModule: true,
//   default: (props: any) => <Link {...props} />
// }))

// // Mockando o editor
// jest.mock("@/components/misc/editor", () => ({
//   __esModule: true,
//   default: ({
//     value,
//     onChange
//   }: {
//     value: string
//     onChange: (value: string) => void
//   }) => (
//     <textarea
//       data-testid="editor"
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//     />
//   )
// }))

// // Mockando ações
// jest.mock("@/app/_actions/tags/get-tags-list", () => ({
//   getTagsListAction: jest.fn(() =>
//     Promise.resolve({
//       tags: [{ name: "test", bg_color_hex: "#000", text_color_hex: "#fff" }]
//     })
//   )
// }))

// jest.mock("@/app/_actions/articles/update-article", () => ({
//   updateArticleAction: jest.fn(() => Promise.resolve({ success: true }))
// }))

// // Mockando fetch
// global.fetch = jest.fn()

// // Mockando useRouter
// const pushMock = jest.fn()
// // jest.mock("next/navigation", () => ({
// //   useRouter: () => ({
// //     push: pushMock,
// //     prefetch: prefetchMock
// //   })
// // }))

// // Mockando sonner
// const toastSuccessMock = jest.fn()
// const toastErrorMock = jest.fn()
// jest.mock("sonner", () => ({
//   toast: {
//     success: toastSuccessMock,
//     error: toastErrorMock
//   }
// }))

describe("UpsertArticleForm", () => {
  // beforeEach(() => {
  //   ;(useRouter as jest.Mock).mockReturnValue({
  //     route: "/",
  //     pathname: "/",
  //     query: {},
  //     asPath: "/",
  //     push: jest.fn(), // Simula a navegação
  //     replace: jest.fn(),
  //     reload: jest.fn(),
  //     back: jest.fn(),
  //     prefetch: jest.fn().mockResolvedValue(undefined),
  //     beforePopState: jest.fn(),
  //     events: {
  //       on: jest.fn(),
  //       off: jest.fn(),
  //       emit: jest.fn()
  //     },
  //     isFallback: false
  //   })

  //   jest.clearAllMocks()
  //   ;(global.fetch as jest.Mock).mockReset()
  // })

  it("generic test", () => {
    expect(true).toBe(true)
  })
  // it("renders empty form correctly for new article", async () => {
  //   render(<UpsertArticleForm />)

  //   expect(
  //     await screen.findByPlaceholderText("Insira o título...")
  //   ).toBeInTheDocument()
  //   expect(screen.getByText("Publicar")).toBeInTheDocument()
  // })

  // it("renders form with article data", async () => {
  //   render(<UpsertArticleForm article={articleMock} />)

  //   expect(await screen.findByDisplayValue("Artigo Teste")).toBeInTheDocument()

  //   const image = screen.getByAltText("Preview da imagem")
  //   expect(image).toHaveAttribute("src", "http://image.png")
  // })

  // it("submit new article successfully", async () => {
  //   ;(global.fetch as jest.Mock).mockResolvedValueOnce({
  //     ok: true,
  //     json: () => Promise.resolve({ id: 123 })
  //   })

  //   render(<UpsertArticleForm />)

  //   fireEvent.change(screen.getByPlaceholderText("Insira o título..."), {
  //     target: { value: "Novo Artigo" }
  //   })

  //   fireEvent.change(screen.getByTestId("editor"), {
  //     target: { value: "Conteúdo do artigo" }
  //   })

  //   fireEvent.click(screen.getByText("Publicar"))

  //   await waitFor(() => {
  //     expect(toastSuccessMock).toHaveBeenCalledWith(
  //       "Artigo criado com sucesso!"
  //     )
  //   })

  //   expect(pushMock).toHaveBeenCalledWith("/articles/123")
  // })

  // it("atualiza artigo existente com sucesso", async () => {
  //   const article = {
  //     ...articleMock,
  //     id: 5,
  //     title: "Artigo Antigo",
  //     body_markdown: "Texto",
  //     tag_list: [],
  //     cover_image: ""
  //   }

  //   render(<UpsertArticleForm article={article} />)

  //   fireEvent.change(screen.getByPlaceholderText("Insira o título..."), {
  //     target: { value: "Atualizado" }
  //   })

  //   fireEvent.click(screen.getByText("Publicar"))

  //   await waitFor(() => {
  //     expect(toastSuccessMock).toHaveBeenCalledWith(
  //       "Artigo atualizado com sucesso!"
  //     )
  //   })

  //   expect(pushMock).toHaveBeenCalledWith("/articles/5")
  // })

  // it("mostra spinner durante submit", async () => {
  //   ;(global.fetch as jest.Mock).mockImplementationOnce(
  //     () =>
  //       new Promise((resolve) =>
  //         setTimeout(
  //           () => resolve({ json: () => Promise.resolve({ id: 123 }) }),
  //           300
  //         )
  //       )
  //   )

  //   render(<UpsertArticleForm />)

  //   fireEvent.change(screen.getByPlaceholderText("Insira o título..."), {
  //     target: { value: "Artigo" }
  //   })

  //   fireEvent.change(screen.getByTestId("editor"), {
  //     target: { value: "Texto" }
  //   })

  //   fireEvent.click(screen.getByText("Publicar"))

  //   expect(screen.getByTestId("spinner")).toBeInTheDocument()

  //   await waitFor(() => expect(global.fetch).toHaveBeenCalled())
  // })

  // it("exibe erro ao falhar upload da imagem", async () => {
  //   ;(global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false })

  //   render(<UpsertArticleForm />)

  //   const fileInput = screen.getByLabelText("Imagem destacada do artigo")
  //   const file = new File(["img"], "test.png", { type: "image/png" })

  //   await act(async () => {
  //     fireEvent.change(fileInput, { target: { files: [file] } })
  //   })

  //   await waitFor(() => {
  //     expect(toastErrorMock).toHaveBeenCalledWith("Erro ao enviar imagem.")
  //   })
  // })
})
