"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function About() {
  const router = useRouter();

  const handleBack = () => {
    try {
      router.push('/');
    } catch (error) {
      console.error('Navigation error:', error);
    }
  };

  const teamMembers = [
    {
      name: "Thiều Văn Minh",
      role: "Frontend Developer",
      description: "Phụ trách phát triển Frontend (NextJs, Shadcn UI, Tanstack Query và TaiwindCSS)",
      github: "https://github.com/minhthieu213",
      linkedin: "https://linkedin.com/in/username2",
    },
    {
      name: "Nguyễn Đại An",
      role: "Frontend Developer",
      description: "Phụ trách phát triển API với Express.js và MySQL",
      github: "https://github.com/username2",
      linkedin: "https://linkedin.com/in/username2",
    },
    {
      name: "Nguyễn Trung Kiên",
      role: "Backend Developer",
      description: "Phụ trách phát triển API với Express.js và MySQL",
      github: "https://github.com/username2",
      linkedin: "https://linkedin.com/in/username2",
    },
    {
      name: "Phạm Trường Mạnh",
      role: "Backend Developer",
      description: "Phụ trách phát triển API với Express.js và MySQL",
      github: "https://github.com/username2",
      linkedin: "https://linkedin.com/in/username2",
    },
    {
      name: "Lường Mạnh Kiên",
      role: "Docker",
      description: "Phụ trách phát triển giao diện người dùng với Next.js và Tailwind CSS",
      github: "https://github.com/username1",
      linkedin: "https://linkedin.com/in/username1",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <Button
          variant="outline"
          className="mb-8 hover:bg-gray-100"
          onClick={handleBack}
        >
          ← Quay lại
        </Button>

        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Về Chúng Tôi</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chúng tôi là nhóm sinh viên đam mê công nghệ, 
            phát triển ứng dụng Kanban Board để giúp mọi người 
            quản lý công việc hiệu quả hơn.
          </p>
        </div>

        {/* Phần hiển thị team members: 3 trên, 2 dưới */}
        <div className="max-w-5xl mx-auto">
          {/* Hàng trên: 3 thẻ */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
            {teamMembers.slice(0, 3).map((member, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex justify-center mb-4">
<div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-4xl text-white font-bold">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-center text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-center text-blue-600 font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600 mb-4">
                    {member.description}
                  </p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-black"
                    >
                      GitHub
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      LinkedIn
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Hàng dưới: 2 thẻ, căn giữa */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {teamMembers.slice(3, 5).map((member, index) => (
              <Card 
                key={index + 3} 
                className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <span className="text-4xl text-white font-bold">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                  <CardTitle className="text-center text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-center text-blue-600 font-medium">
                    {member.role}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-gray-600 mb-4">
                    {member.description}
                  </p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-black"
                    >
                      GitHub
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600"
                    >
                      LinkedIn
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Về Dự Án</h2>
          <div className="bg-white rounded-lg p-8 shadow-md">
            <p className="text-gray-600 mb-4">
              Kanban Board là một ứng dụng quản lý công việc hiện đại, 
              được xây dựng với các công nghệ mới nhất:
            </p>
<div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Frontend</h3>
                <ul className="text-gray-600 text-sm">
                  <li>Next.js 13+</li>
                  <li>Tailwind CSS</li>
                  <li>Shadcn UI</li>
                  <li>React Query</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-2">Backend</h3>
                <ul className="text-gray-600 text-sm">
                  <li>Express.js</li>
                  <li>MySQL</li>
                  <li>Drizzle ORM</li>
                  <li>TypeScript</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}