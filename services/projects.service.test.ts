import { createProject } from "@/services/projects.service";
import { addDoc, collection } from "@/mocks/firebase-mock";

jest.mock("firebase/firestore", () => require("@/mocks/firebase-mock"));

describe("createProject", () => {
  // mocking the addDoc function
  it("should create a project successfully :D", async () => {
    addDoc.mockResolvedValueOnce({ id: "new-id" } as any);
    collection.mockReturnValueOnce({} as any);

    const result = await createProject("New Project", "user123");

    expect(addDoc).toHaveBeenCalledWith(expect.anything(), {
      name: "New Project",
      createdAt: expect.any(Number),
      uid: "user123",
    });

    expect(result).toEqual({
      id: "new-id",
      name: "New Project",
      createdAt: expect.any(Number),
      uid: "user123",
    });
  });

  it("should throw an error if addDoc fails", async () => {
    addDoc.mockRejectedValueOnce(new Error("Failed to create project"));
    collection.mockReturnValueOnce({} as any);

    await expect(createProject("New Project", "user123")).rejects.toThrow(
      "Failed to create project"
    );

    expect(addDoc).toHaveBeenCalledWith(expect.anything(), {
      name: "New Project",
      createdAt: expect.any(Number),
      uid: "user123",
    });
  });
});
