package main

import (
	"github.com/gofiber/fiber/v2"
)

func handle_root(c *fiber.Ctx) error {
	return c.SendString("Hello, GoFiber!")
}

func handle_about(c *fiber.Ctx) error {
	return c.SendString("About page")
}

func handle_submit(c *fiber.Ctx) error {
	// handle POST request
	return c.SendString("Form submitted")
}

func handle_scamsense(c *fiber.Ctx) error {
	// handle POST request for /scamsense
	// read request body
	//req := c.Body()
	// parse JSON

	// extract relevant fields
	// validate input
	// process the data
	// return response
	return c.SendString("ScamSense endpoint")
}

func main() {
	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return handle_root(c)
	})

	app.Get("/about", func(c *fiber.Ctx) error {
		return handle_about(c)
	})

	app.Post("/submit", func(c *fiber.Ctx) error {
		// handle POST request
		return handle_submit(c)
	})

	app.Post("/scamsense", func(c *fiber.Ctx) error {
		return handle_scamsense(c)
	})

	app.Listen(":3000")
}
