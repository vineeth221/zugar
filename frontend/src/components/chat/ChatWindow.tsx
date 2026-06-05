"use client";

import { useEffect, useRef } from "react";
import {
  Home,
  Search,
  Scale,
  Heart,
  Calendar,
  BarChart3,
  MessageCircle,
  User,
  Plus,
  Bell,
  Lock,
  Target,
  ArrowRight,
} from "lucide-react";

import { useChatStore } from "@/store/chat.store";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import PreferenceForm from "./PreferenceForm";
import HomeFitScore from "./HomeFitScore";
import RecommendationCards from "./RecommendationCards";
import ComparePanel from "./ComparePanel";

const fallbackImage =
  "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?q=80&w=600";

export default function ChatWindow() {
  const {
    messages,
    isLoading,
    sendMessage,
    sessions,
    insights,
    recommendations,
    loadInitialData,
    openSession,
    createNewSession,
  } = useChatStore();

  const latestUserMessageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  useEffect(() => {
    if (!messages.length) return;

    const latestMessage = messages[messages.length - 1];

    if (latestMessage.role === "user") {
      setTimeout(() => {
        latestUserMessageRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
    }
  }, [messages]);

  useEffect(() => {
    if (!messages.length || isLoading) return;

    setTimeout(() => {
      latestUserMessageRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  }, [isLoading, messages]);

  const navItems = [
    Home,
    Search,
    Scale,
    Heart,
    Calendar,
    BarChart3,
    MessageCircle,
    User,
  ];

  return (
    <main className="flex h-screen overflow-hidden bg-[#f7f8fc] text-[#111827]">
      <aside className="hidden w-[78px] shrink-0 flex-col items-center border-r border-[#e8eaf2] bg-white py-6 lg:flex">
        <div className="mb-12 flex h-12 w-12 items-center justify-center rounded-2xl bg-black text-lg font-bold text-white shadow-lg">
          AR
        </div>

        <nav className="flex flex-1 flex-col items-center gap-7 text-[#6b7280]">
          {navItems.map((Icon, index) =>
            index === 0 ? (
              <button
                key={index}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f0edff] text-[#5b43ff]"
              >
                <Icon size={22} />
              </button>
            ) : (
              <Icon key={index} size={22} />
            )
          )}
        </nav>
      </aside>

      <aside className="hidden h-screen w-[330px] shrink-0 overflow-hidden border-r border-[#e8eaf2] bg-white xl:block">
        <div className="flex items-center justify-between px-7 py-7">
          <h2 className="text-xl font-bold">My Sessions</h2>

          <button
            onClick={createNewSession}
            className="flex items-center gap-2 rounded-xl bg-[#5b43ff] px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200"
          >
            <Plus size={17} />
            New Chat
          </button>
        </div>

        <div className="max-h-[calc(100vh-260px)] space-y-3 overflow-y-auto px-5 pb-4">
          {sessions.length === 0 && (
            <p className="px-2 text-sm text-gray-500">No sessions yet</p>
          )}

          {sessions.map((item, index) => (
            <div
              key={item._id}
              onClick={() => openSession(item._id)}
              className={`flex cursor-pointer gap-4 rounded-2xl p-4 ${
                index === 0 ? "bg-[#f4f2ff]" : "hover:bg-[#f7f7fb]"
              }`}
            >
              <img
                src={fallbackImage}
                alt={item.title}
                className="h-14 w-14 rounded-xl object-cover"
              />

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{item.title}</p>
                <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                  {item.lastMessage || "New ARKHA session"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-7 mt-10 rounded-3xl bg-[#f2efff] p-6">
          <p className="font-bold text-[#5b43ff]">ARKHA PRO ✨</p>
          <p className="mt-5 text-sm leading-6 text-gray-600">
            Unlock advanced insights, personalised recommendations, and more.
          </p>
          <button className="mt-6 flex w-full items-center justify-between rounded-xl border border-[#6d5cff] px-4 py-3 text-sm font-semibold text-[#5b43ff]">
            Upgrade Now
            <ArrowRight size={16} />
          </button>
        </div>
      </aside>

      <section className="flex h-screen min-w-0 flex-1 flex-col overflow-hidden pb-20 lg:pb-0">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#e8eaf2] bg-white/80 px-4 py-4 backdrop-blur sm:px-6 lg:px-8 lg:py-5">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
                ARKHA
              </h1>
              <span className="rounded-lg bg-[#e9e6ff] px-2 py-1 text-xs font-bold text-[#5b43ff]">
                AI
              </span>
            </div>
            <p className="text-xs text-gray-500 sm:text-sm">
              AI Home Decision Engine
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button className="hidden items-center gap-2 rounded-xl border border-[#e4e6ef] bg-white px-4 py-2 text-sm font-medium sm:flex lg:px-5 lg:py-3">
              <Lock size={15} />
              Unlimited
            </button>

            <button className="hidden items-center gap-2 rounded-xl border border-[#e4e6ef] bg-white px-4 py-2 text-sm font-medium md:flex lg:px-5 lg:py-3">
              <Target size={15} className="text-red-500" />
              2/3 Quests
            </button>

            <Bell size={19} className="text-gray-500" />
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-gray-300 to-gray-700 sm:h-11 sm:w-11" />
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 pb-32 sm:px-6 sm:py-7 lg:px-10 lg:py-8">
          {messages.length === 0 ? (
            <>
              <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-white via-[#f4f1ff] to-[#eef4ff] p-6 sm:p-8 lg:p-10">
                <div className="max-w-3xl">
                  <p className="text-sm font-semibold text-[#5b43ff] sm:text-lg">
                    Welcome to ARKHA 👋
                  </p>

                  <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                    Find the right home before you visit.
                  </h2>

                  <p className="mt-4 max-w-2xl text-sm leading-6 text-gray-600 sm:text-lg sm:leading-8">
                    Tell ARKHA your budget, purpose, location, and lifestyle
                    priorities. It remembers your needs and recommends homes
                    using real project data.
                  </p>
                </div>
              </section>

              <div className="mt-8 space-y-8">
                <PreferenceForm />

                <HomeFitScore recommendations={recommendations} />

                <RecommendationCards recommendations={recommendations} />

                <ComparePanel />

                <section className="rounded-[32px] border border-[#eceaf7] bg-white p-6 shadow-sm">
                  <h2 className="text-xl font-bold">ARKHA Insights</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    Dynamic market signals from your database.
                  </p>

                  <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {insights.map((item) => (
                      <div
                        key={item._id}
                        className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
                      >
                        <p className="text-sm text-gray-600">{item.label}</p>
                        <p className="mt-2 text-xl font-bold">{item.value}</p>
                        <p className="mt-1 text-xs text-gray-500">
                          {item.note}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="fixed bottom-6 left-4 right-4 z-50 mx-auto max-w-3xl rounded-[32px] bg-white/30 p-2 backdrop-blur-xl lg:left-[78px] xl:left-[408px]">
                <ChatInput onSend={sendMessage} disabled={isLoading} />
              </div>
            </>
          ) : (
            <div className="mx-auto max-w-[1100px] space-y-8 pb-[260px]">
              {messages.map((message, index) => {
                const isLatestUserMessage =
                  message.role === "user" &&
                  index === messages.map((m) => m.role).lastIndexOf("user");

                return (
                  <div
                    key={message.id}
                    ref={isLatestUserMessage ? latestUserMessageRef : null}
                    className={isLatestUserMessage ? "scroll-mt-24" : ""}
                  >
                    <ChatMessage message={message} />
                  </div>
                );
              })}

              {isLoading && (
                <p className="text-sm text-gray-500">ARKHA is thinking...</p>
              )}

              <div className="fixed bottom-6 left-4 right-4 z-50 mx-auto max-w-3xl rounded-[32px] bg-white/30 p-2 backdrop-blur-xl lg:left-[78px] xl:left-[408px]">
                <ChatInput onSend={sendMessage} disabled={isLoading} />
              </div>
            </div>
          )}
        </div>
      </section>

      <nav className="fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-[#e8eaf2] bg-white px-3 py-3 text-[#6b7280] lg:hidden">
        {navItems.slice(0, 5).map((Icon, index) => (
          <button
            key={index}
            className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
              index === 0 ? "bg-[#f0edff] text-[#5b43ff]" : ""
            }`}
          >
            <Icon size={21} />
          </button>
        ))}
      </nav>
    </main>
  );
}