import request from "supertest";
import app from "../src/app.js";
import { HTTP_STATUS, MESSAGES } from "../src/config/constants.js";

const BASE_URL = `/api/v1/course`;

describe("Course API", () => {
  it("should create a course", async () => {
    const res = await request(app)
      .post(BASE_URL)
      .send({
        title: "Advanced React and Next.js Masterclass VIP 2",
        subTitle: "Build production-ready applications with React ecosystem",
        summary:
          "A complete course for mastering React, Next.js, TypeScript, and modern frontend architecture.",
        description:
          "In this course you will learn advanced React concepts including hooks, performance optimization, state management, Next.js App Router, server components, authentication, and building scalable frontend applications.",
        publishedAt: "2026-06-16T10:00:00.000Z",
        accessWay: "streaming",
        supportVia: ["telegram", "website"],
        price: 120,
        discount: 20,
        finalPrice: 96,
        duration: 45,
        instructor: "6a11f4f480692c3d12001346",
        coverImage: "courses/react-nextjs-masterclass.jpg",
      });

    console.dir(res.body, {
      depth: null,
    });

    expect(res.statusCode).toBe(HTTP_STATUS.CREATED);

    expect(res.body.data.newCourse.title).toBe(
      "Advanced React and Next.js Masterclass VIP 2",
    );
  });

  it("should get all courses", async () => {
    const res = await request(app).get(BASE_URL);

    console.dir(res.body, {
      depth: null,
    });

    expect(res.statusCode).toBe(HTTP_STATUS.OK);

    expect(res.body.status).toBe("SUCCESS");
  });

  it("should get a single course by id", async () => {
    const res = await request(app).get(`${BASE_URL}/6a3192aed540f7642e3b9383`);

    console.dir(res.body, { depth: null });

    expect(res.statusCode).toBe(HTTP_STATUS.OK);
    expect(res.body.status).toBe("SUCCESS");
  });

  it("should update course by id", async () => {
    const res = await request(app)
      .patch(`${BASE_URL}/6a3192aed540f7642e3b9383`)
      .send({
        title: "Updated title!",
        price: 190,
      });

    console.dir(res.body, { depth: null });

    expect(res.statusCode).toBe(HTTP_STATUS.OK);
  });

  it("should delete course by id", async () => {
    const res = await request(app).delete(
      `${BASE_URL}/6a319c3b7d88d6c360c79e80`,
    );

    console.dir(res.body, { depth: null });

    expect(res.statusCode).toBe(HTTP_STATUS.OK);
  });
});
