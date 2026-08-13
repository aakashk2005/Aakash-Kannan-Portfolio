import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Contact from "../../pages/contact/index";
import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock framer-motion animations
vi.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }) => <p {...props}>{children}</p>,
    button: ({ children, ...props }) => <button {...props}>{children}</button>,
    a: ({ children, ...props }) => <a {...props}>{children}</a>,
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));

// Mock Next.js Link component
vi.mock("next/link", () => ({
  default: ({ children, href }) => <a href={href}>{children}</a>,
}));

// Mock react-icons/fa to avoid rendering undefined icon objects during testing
vi.mock("react-icons/fa", () => {
  const mockIcon = () => <span data-testid="mock-icon" />;
  return {
    FaUser: mockIcon,
    FaEnvelope: mockIcon,
    FaTag: mockIcon,
    FaPencilAlt: mockIcon,
    FaPaperPlane: mockIcon,
    FaBolt: mockIcon,
    FaShieldAlt: mockIcon,
    FaHandshake: mockIcon,
    FaQuoteLeft: mockIcon,
    FaDownload: mockIcon,
    FaLinkedinIn: mockIcon,
    FaGithub: mockIcon,
    FaBehance: mockIcon,
    FaDribbble: mockIcon,
    FaWhatsapp: mockIcon,
    FaMapMarkerAlt: mockIcon,
    FaPhoneAlt: mockIcon,
    FaClock: mockIcon,
  };
});

// Mock react-icons/hi2 to avoid rendering undefined icon objects during testing
vi.mock("react-icons/hi2", () => {
  const mockIcon = () => <span data-testid="mock-icon" />;
  return {
    HiArrowRight: mockIcon,
  };
});

describe("Contact Form Component Validation", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all form elements and fields", () => {
    render(<Contact />);
    expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Your Message/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Send Message/i })).toBeInTheDocument();
  });

  it("handles valid submissions and triggers web3forms fetch", async () => {
    const mockFetch = vi.spyOn(global, "fetch").mockImplementation(() =>
      Promise.resolve({
        ok: true,
        headers: new Map([["content-type", "application/json"]]),
        json: () => Promise.resolve({ success: true }),
      })
    );

    render(<Contact />);

    fireEvent.change(screen.getByLabelText(/Your Name/i), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByLabelText(/Your Email/i), { target: { value: "john@example.com" } });
    fireEvent.change(screen.getByLabelText(/Subject/i), { target: { value: "Hello" } });
    fireEvent.change(screen.getByLabelText(/Your Message/i), { target: { value: "My message body" } });

    fireEvent.click(screen.getByRole("button", { name: /Send Message/i }));

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.web3forms.com/submit",
        expect.objectContaining({
          method: "POST",
          body: expect.stringContaining("john@example.com"),
        })
      );
    });

    // Check if success message is displayed
    expect(screen.getByText(/Message Sent!/i)).toBeInTheDocument();
  });
});
