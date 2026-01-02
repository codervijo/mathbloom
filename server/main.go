package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
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

	// Enable CORS so the webapp dev server (vite) can fetch demo data
	app.Use(cors.New(cors.Config{
		AllowOrigins: "*",
		AllowMethods: "GET,POST,HEAD,PUT,DELETE,OPTIONS",
	}))

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

	// Demo data endpoint
	app.Get("/api/demo-family", func(c *fiber.Ctx) error {
		demo := map[string]interface{}{
			"id":        "demo",
			"parentPIN": "1234",
			"children": []map[string]interface{}{
				{
					"id":       "demo-11",
					"name":     "Sam2 (Demo)",
					"avatar":   "👦",
					"streak":   5,
					"accuracy": 87,
					"level":    4,
					"sessions": []map[string]interface{}{
						{"date": "2025-12-01", "topic": "Addition", "problems": 15, "accuracy": 93, "avgTime": 2.1, "status": "Mastered"},
						{"date": "2025-11-30", "topic": "Multiplication", "problems": 12, "accuracy": 85, "avgTime": 3.2, "status": "Needs Review"},
					},
				},
				{
					"id":       "demo-22",
					"name":     "Ava2 (Demo)",
					"avatar":   "👧",
					"streak":   8,
					"accuracy": 92,
					"level":    5,
					"sessions": []map[string]interface{}{
						{"date": "2025-12-01", "topic": "Division", "problems": 10, "accuracy": 95, "avgTime": 2.5, "status": "Mastered"},
					},
				},
			},
		}

		return c.JSON(demo)
	})

	// Status endpoint
	app.Get("/api/v1/status", func(c *fiber.Ctx) error {
		status := map[string]interface{}{
			"status":  "ok",
			"version": "1.0.0",
			"uptime":  123456, // in seconds
		}
		return c.JSON(status)
	})

	// Get demo questions endpoint
	app.Get("/api/v1/demo-questions", func(c *fiber.Ctx) error {
		questions := []map[string]interface{}{
			{"id": "q1", "question": "What is 2 + 2?", "options": []int{3, 4, 5}, "answer": 4},
			{"id": "q2", "question": "What is 5 x 3?", "options": []int{15, 10, 20}, "answer": 15},
		}
		return c.JSON(questions)
	})

	app.Listen(":3000")
}
