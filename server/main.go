package main

import (
	"encoding/json"
	"os"

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

func handle_demo_family(c *fiber.Ctx) error {
	// Read demo data from local JSON file (relative to the server process working directory).
	// Most common: when started via ./server/run_gofiber.sh, the working directory is ./server.
	candidatePaths := []string{
		"demo_family.json",
		"server/demo_family.json",
	}

	var (
		b   []byte
		err error
	)
	for _, p := range candidatePaths {
		b, err = os.ReadFile(p)
		if err == nil {
			break
		}
	}
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "failed to read demo_family.json",
			"details": err.Error(),
		})
	}

	var demo any
	if err := json.Unmarshal(b, &demo); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "failed to parse demo_family.json",
			"details": err.Error(),
		})
	}

	return c.JSON(demo)
}

func loadDemoPracticeQuestions() []map[string]interface{} {
	// Primary source: webapp/src/data/mock/practice-questions.json (keeps server + webapp in sync in this repo)
	candidatePaths := []string{
		"webapp/src/data/mock/practice-questions.json",
		"webapp/src/data/mock/questions1.json",
	}

	for _, p := range candidatePaths {
		b, err := os.ReadFile(p)
		if err != nil {
			continue
		}
		var questions []map[string]interface{}
		if err := json.Unmarshal(b, &questions); err != nil {
			continue
		}
		if len(questions) > 0 {
			return questions
		}
	}

	// Final fallback: hard-coded minimal set
	return []map[string]interface{}{
		{"number": 1, "question": "6 × 7 = ?", "type": "multiple-choice", "options": []int{35, 42, 48, 54}, "correctAnswer": 42, "hint": "Think of 6 groups of 7."},
		{"number": 2, "question": "45 ÷ 9 = ?", "type": "input", "correctAnswer": 5, "hint": "How many 9s fit into 45?"},
	}
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
		return handle_demo_family(c)
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

	// Practice questions endpoint used by the webapp Practice page
	app.Get("/api/v1/demo-practice.json", func(c *fiber.Ctx) error {
		return c.JSON(loadDemoPracticeQuestions())
	})

	app.Listen(":3000")
}
