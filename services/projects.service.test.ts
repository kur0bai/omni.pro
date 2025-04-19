import { createProject } from "@/services/projects.service";
import { addDoc, collection } from "@/mocks/firebase-mock";

describe("createProject", () => {
  it("should create a project successfully :D", async () => {
    addDoc.mockResolvedValueOnce({ id: "new-id" });

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
});
