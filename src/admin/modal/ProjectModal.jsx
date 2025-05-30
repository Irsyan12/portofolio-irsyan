import React, { useState, useEffect } from "react";
import { FaImage, FaLink, FaGithub, FaPlay } from "react-icons/fa";
import OutlinedTextField from "../../components/OutlinedTextField"; // Import OutlinedTextField

const ProjectModal = ({ project, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: "",
    type: "Project", // Default value
    description: "",
    imageUrl: "",
    projectLink: "", // Project repository link
    demoLink: "", // New demo link field
    certificateInstitution: "",
    certificateLink: "",
    ...project,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isLoadingPreview, setIsLoadingPreview] = useState(false);
  const [linkPreview, setLinkPreview] = useState(null);

  useEffect(() => {
    if (project) {
      setFormData({
        id: project.id,
        title: project.title,
        type: project.type || "Project",
        description: project.description || "",
        imageUrl: project.imageUrl || "",
        projectLink: project.projectLink || "",
        demoLink: project.demoLink || "", // Include demo link
        certificateInstitution: project.certificateInstitution || "",
        certificateLink: project.certificateLink || "",
      });

      // Load link preview if project link exists
      if (project.projectLink) {
        fetchLinkPreview(project.projectLink);
      }
    }
  }, [project]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchLinkPreview = async (url) => {
    if (!url || !url.trim().startsWith("http")) return;

    setIsLoadingPreview(true);
    try {
      const response = await fetch(
        `https://api.microlink.io/?url=${encodeURIComponent(url)}&meta=false`
      );

      if (!response.ok) throw new Error("Failed to fetch link preview");

      const { data } = await response.json();

      const previewData = {
        title: data.title || "No Title",
        description: data.description || "",
        image: data.image?.url || null,
        url: data.url,
      };

      setLinkPreview(previewData);

      if (url.includes("github.com")) {
        try {
          const parts = url.split("github.com/")[1]?.split("/");
          if (parts && parts.length >= 2) {
            const username = parts[0];
            const repo = parts[1];

            const githubResponse = await fetch(
              `https://api.github.com/repos/${username}/${repo}`
            );

            if (githubResponse.ok) {
              const repoData = await githubResponse.json();

              previewData.description =
                repoData.description || previewData.description;
              previewData.title = repoData.full_name || previewData.title;

              const ogImageUrl = `https://opengraph.githubassets.com/1/${username}/${repo}`;
              previewData.image = ogImageUrl;

              setLinkPreview(previewData);

              if (!formData.imageUrl) {
                setFormData((prev) => ({
                  ...prev,
                  imageUrl: ogImageUrl,
                }));
              }
            }
          }
        } catch (githubErr) {
          console.error("Error fetching GitHub data:", githubErr);
          if (!previewData.image) {
            previewData.image =
              "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png";
            setLinkPreview(previewData);
          }
        }
      }

      if (previewData.image && !formData.imageUrl) {
        setFormData((prev) => ({
          ...prev,
          imageUrl: previewData.image,
        }));
      }
    } catch (error) {
      console.error("Error fetching link preview:", error);

      if (url.includes("github.com")) {
        const parts = url.split("github.com/")[1]?.split("/");
        if (parts && parts.length >= 2) {
          const username = parts[0];
          const repo = parts[1];

          const fallbackPreview = {
            title: `${username}/${repo}`,
            description: "GitHub Repository",
            image: `https://opengraph.githubassets.com/1/${username}/${repo}`,
            url: url,
          };

          setLinkPreview(fallbackPreview);

          if (!formData.imageUrl) {
            setFormData((prev) => ({
              ...prev,
              imageUrl: fallbackPreview.image,
            }));
          }
        } else {
          const fallbackPreview = {
            title: url.split("/").slice(-2).join("/"),
            description: "GitHub Repository",
            image:
              "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
            url: url,
          };

          setLinkPreview(fallbackPreview);

          if (!formData.imageUrl) {
            setFormData((prev) => ({
              ...prev,
              imageUrl: fallbackPreview.image,
            }));
          }
        }
      }
    } finally {
      setIsLoadingPreview(false);
    }
  };

  const handleLinkBlur = () => {
    if (formData.projectLink) {
      fetchLinkPreview(formData.projectLink);
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Tidak ada file yang dipilih!");
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "projects_web");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dxwmph7tj/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Cloudinary error:", data);
        alert("Gagal upload gambar: " + data.error?.message);
        return;
      }

      setFormData((prev) => ({
        ...prev,
        imageUrl: data.secure_url,
      }));
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Error saat mengupload gambar. Periksa console untuk detail.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedTitle = formData.title.replace(/\s+/g, "+");

    const imageUrl =
      formData.imageUrl ||
      `https://placehold.co/600x400?text=${formattedTitle}`;

    const finalData = {
      ...formData,
      imageUrl: imageUrl,
    };

    if (formData.type === "Certification") {
      if (!formData.certificateInstitution) {
        alert("Institusi sertifikat harus diisi");
        return;
      }
    }

    onSave(finalData);
  };

  const getLinkIcon = () => {
    if (formData.projectLink?.includes("github.com")) {
      return <FaGithub className="mr-2 text-gray-400" size={20} />;
    }
    return <FaLink className="mr-2 text-gray-400" size={20} />;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1E1E1E] rounded-lg p-6 w-full max-w-md">
        <h2 className="text-color1 text-2xl font-bold mb-4">
          {project ? "Edit Project" : "Add New Project"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <OutlinedTextField
              type="text"
              name="title"
              label="Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full bg-dark text-white border border-gray-700 rounded-md p-2"
              required
            >
              <option value="Project">Project</option>
              <option value="Certification">Certification</option>
            </select>
          </div>

          {formData.type === "Project" && (
            <>
              <div className="mb-4">
                <div className="flex items-center">
                  {getLinkIcon()}
                  <OutlinedTextField
                    type="url"
                    name="projectLink"
                    label="Project Link (Optional)"
                    value={formData.projectLink}
                    onChange={handleChange}
                    onBlur={handleLinkBlur}
                    placeholder="https://github.com/username/repo"
                  />
                </div>
                {linkPreview && (
                  <div className="mt-2 border border-gray-700 rounded-md overflow-hidden">
                    <div className="p-3 bg-gray-800">
                      <h3 className="text-sm font-medium text-gray-300 truncate">
                        {linkPreview.title}
                      </h3>
                      {linkPreview.description && (
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                          {linkPreview.description}
                        </p>
                      )}
                      <p className="text-xs text-gray-500 mt-1 truncate">
                        {formData.projectLink}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <div className="flex items-center">
                  <FaPlay className="mr-2 text-gray-400" size={20} />
                  <OutlinedTextField
                    type="url"
                    name="demoLink"
                    label="Demo Link (Optional)"
                    value={formData.demoLink}
                    onChange={handleChange}
                    placeholder="https://demo-example.com"
                  />
                </div>
              </div>
            </>
          )}

          {formData.type === "Certification" && (
            <>
              <div className="mb-4">
                <OutlinedTextField
                  type="text"
                  name="certificateInstitution"
                  label="Certificate Institution"
                  value={formData.certificateInstitution}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <div className="flex items-center">
                  <FaLink className="mr-2 text-gray-400" size={20} />
                  <OutlinedTextField
                    type="url"
                    name="certificateLink"
                    label="Certificate Link (Optional)"
                    value={formData.certificateLink}
                    onChange={handleChange}
                    placeholder="https://example.com/certificate"
                  />
                </div>
              </div>
            </>
          )}

          <div className="mb-4">
            <OutlinedTextField
              name="description"
              label="Description (Optional)"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Image</label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="imageUpload"
                disabled={isUploading}
              />
              <label
                htmlFor="imageUpload"
                className={`${
                  isUploading ? "bg-gray-700" : "bg-gray-800"
                } text-gray-300 px-4 py-2 rounded-md hover:bg-gray-700 transition-colors flex items-center cursor-pointer`}
              >
                <FaImage className="mr-2" size={20} />
                {isUploading ? "Uploading..." : "Upload Gambar"}
              </label>
              {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-16 h-16 object-cover rounded-md"
                />
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="text-gray-300 hover:text-white transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="bg-color1 text-black px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
              disabled={isUploading || isLoadingPreview}
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;
