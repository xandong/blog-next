/* eslint-disable no-extra-semi */
import "@testing-library/jest-dom"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { SignIn } from "../../../components/layout/sign-in"

jest.mock("../../../app/_actions/session", () => ({
  saveApiKeyAction: jest.fn()
}))
import { saveApiKeyAction } from "../../../app/_actions/session"

describe("SignIn", () => {
  beforeEach(() => {
    ;(saveApiKeyAction as jest.Mock).mockResolvedValue({ success: true })
  })

  it("should render the sign in form", async () => {
    render(<SignIn />)

    const trigger = screen.getByRole("button", { name: /Entrar/i })
    expect(trigger).toBeInTheDocument()

    // Open the popover
    await userEvent.click(trigger)

    expect(screen.queryAllByText("API Key")[0]).toBeInTheDocument()
    expect(screen.queryAllByText("Entrar").length).toBe(2)
  })

  it("should submit the form and call saveApiKeyAction with correct data", async () => {
    const user = userEvent.setup()
    render(<SignIn />)

    await user.click(screen.getByRole("button", { name: /Entrar/i }))

    const input = screen.getByLabelText("API Key")
    await user.type(input, "valid-api-key")

    await user.click(screen.getAllByRole("button", { name: /Entrar/i })[1])

    await waitFor(() => {
      expect(saveApiKeyAction).toHaveBeenCalledTimes(1)

      const formData = (saveApiKeyAction as jest.Mock).mock.calls[0][0]
      expect(formData instanceof FormData).toBe(true)
      expect(formData.get("apiKey")).toBe("valid-api-key")
    })
  })

  it("should show loading state while submitting", async () => {
    const user = userEvent.setup()

    const mockPromise = new Promise((resolve) =>
      setTimeout(() => resolve({ success: true }), 200)
    )
    ;(saveApiKeyAction as jest.Mock).mockImplementation(() => mockPromise)

    render(<SignIn />)

    await user.click(screen.getByRole("button", { name: /entrar/i }))

    await user.type(screen.getByLabelText(/api key/i), "valid-api-key")

    await user.click(screen.getAllByRole("button", { name: /entrar/i })[1])

    expect(screen.getByTestId("loader")).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument()
    })
  })
})
