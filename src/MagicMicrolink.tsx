// src/LinkPreview.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";

interface MagicMicrolinkProps {
  url: string;
  theme: "light" | "dark";
}

interface Metadata {
  title: string;
  description: string;
  publisher: string;
  author: string;
  lang: string;
  image: {
    url?: string;
    type?: string;
  };
  url: string;
  logo: {
    url?: string;
    type?: string;
  };
}

const PreviewContainer = styled.a<{ theme: "light" | "dark" }>`
  display: flex;
  align-items: flex-start;
  border-radius: 2px;
  max-width: 500px;
  box-sizing: border-box;
  height: 130px;
  overflow: hidden;
  background-color: ${({ theme }) =>
    theme === "dark" ? "#2c2c2c" : "#ffffff"};
  border: 1px solid ${({ theme }) => (theme === "dark" ? "#444" : "#e0e0e0")};
  color: ${({ theme }) => (theme === "dark" ? "#ffffff" : "#333")};

  @media (max-width: 600px) {
  }
`;

const PreviewImage = styled.img`
  width: 30%;
  height: 100%;
  object-fit: cover;

  @media (max-width: 600px) {
    display: none;
  }
`;

const ImagePlaceholder = styled.div`
  background-color: #d8d8d8;
  width: 30%;
  height: 100%;
  object-fit: cover;

  @media (max-width: 600px) {
    display: none;
  }
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  gap: 5px;
  align-items: flex-start;
  padding-left: 10px;
  padding-right: 10px;
`;

const PreviewTitle = styled.p`
  font-weight: bold;
  font-size: 1em;
  margin-bottom: 5px;
  margin: 0px;

  @media (max-width: 600px) {
    text-align: start;
    font-size: 0.9em;
  }
`;

const PreviewDescription = styled.div`
  font-size: 0.7em;
  margin-bottom: 5px;
  text-align: start;
`;

const PreviewLink = styled.a`
  font-size: 0.85em;
  color: #007bff;
  text-decoration: none;
  word-break: break-all;

  &:hover {
    text-decoration: underline;
  }
`;

const MagicMicrolink: React.FC<MagicMicrolinkProps> = ({ url, theme }) => {
  const [metadata, setMetadata] = useState<Metadata | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const response = await fetch(
          `https://next-app-server-link-preview.vercel.app/api/link-preview?url=${url}`
        );
        const result = await response.json();
        setMetadata(result.data);
      } catch (error) {
        console.error("Failed to fetch metadata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [url]);

  const extractHostName = (text: string) => {
    const urlRegex = /https?:\/\/[^\s]+/g;
    const matches = text.matchAll(urlRegex);

    const domains = Array.from(matches).map((match) => {
      const url = match[0];
      const urlObject = new URL(url);
      return urlObject.hostname;
    });

    return {
      hostnames: domains,
    };
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!metadata) return null;

  return (
    <PreviewContainer
      theme={theme}
      href={metadata.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      {metadata.image?.url ? (
        <PreviewImage src={metadata.image.url} alt={metadata.title} />
      ) : (
        <ImagePlaceholder />
      )}
      <TextContainer>
        <PreviewTitle title={`${metadata.title}`}>
          {metadata.title.length > 35
            ? `${metadata.title.slice(0, 35)}...`
            : metadata.title}
        </PreviewTitle>
        <PreviewDescription title={`${metadata.description}`}>
          {metadata.description.length > 100
            ? `${metadata.description.slice(0, 100)}...`
            : metadata.description}
        </PreviewDescription>
        <PreviewLink
          href={metadata.url}
          target="_blank"
          rel="noopener noreferrer"
          title={`${extractHostName(metadata.url).hostnames}`}
        >
          {extractHostName(metadata.url).hostnames}
        </PreviewLink>
      </TextContainer>
    </PreviewContainer>
  );
};

export default MagicMicrolink;
