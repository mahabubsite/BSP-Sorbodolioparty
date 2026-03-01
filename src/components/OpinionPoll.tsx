import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Vote, CheckCircle2 } from "lucide-react";

interface PollOption {
  text: string;
  votes: number;
}

interface Poll {
  question: string;
  options: PollOption[];
}

const initialPolls: Poll[] = [
  {
    question: "🏆 সেরা স্লোগান কোনটি?",
    options: [
      { text: "চা খাও, দেশ বাঁচাও", votes: 342 },
      { text: "পোস্টারে বিপ্লব, মিটিংয়ে ঘুম", votes: 287 },
      { text: "ভোট দাও না দাও, চা দাও", votes: 456 },
      { text: "আমরা হারি না, শুধু জিতি না", votes: 198 },
    ],
  },
  {
    question: "☕ মিটিংয়ে সবচেয়ে জরুরি কী?",
    options: [
      { text: "চা ও বিস্কুট", votes: 521 },
      { text: "মাইক্রোফোন (চিৎকারের জন্য)", votes: 134 },
      { text: "সেলফি তোলার জায়গা", votes: 267 },
      { text: "এসি (ঘুমানোর জন্য)", votes: 389 },
    ],
  },
  {
    question: "🗳️ পরবর্তী নির্বাচনে কী করবেন?",
    options: [
      { text: "ভোট দিব (যদি চা পাই)", votes: 445 },
      { text: "পোস্টার দেখে সিদ্ধান্ত নিব", votes: 178 },
      { text: "ঘুমাব", votes: 356 },
      { text: "চায়ের দোকানে বসে গল্প করব", votes: 290 },
    ],
  },
];

const OpinionPoll = () => {
  const [polls, setPolls] = useState<Poll[]>(initialPolls);
  const [votedPolls, setVotedPolls] = useState<Set<number>>(new Set());

  const handleVote = (pollIndex: number, optionIndex: number) => {
    if (votedPolls.has(pollIndex)) return;

    setPolls((prev) => {
      const updated = [...prev];
      updated[pollIndex] = {
        ...updated[pollIndex],
        options: updated[pollIndex].options.map((opt, i) =>
          i === optionIndex ? { ...opt, votes: opt.votes + 1 } : opt
        ),
      };
      return updated;
    });
    setVotedPolls((prev) => new Set(prev).add(pollIndex));
  };

  const getTotalVotes = (poll: Poll) =>
    poll.options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <section className="py-10 md:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Vote className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              জনমত জরিপ
            </h2>
          </div>
          <p className="text-muted-foreground text-sm">
            আপনার মূল্যবান(?) মতামত দিন — ফলাফলে কিছু যায় আসে না
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="flex gap-4 md:grid md:grid-cols-3 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory px-4 md:px-0">
            {polls.map((poll, pollIndex) => {
            const totalVotes = getTotalVotes(poll);
            const hasVoted = votedPolls.has(pollIndex);

            return (
              <motion.div
                key={pollIndex}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: pollIndex * 0.15 }}
                className={`bg-card border border-border rounded-xl p-5 shadow-sm flex-shrink-0 w-[85%] sm:w-[60%] md:w-auto snap-center`}
              >
                <h3 className="font-bold text-foreground mb-4 text-base">
                  {poll.question}
                </h3>

                <div className="space-y-2.5">
                  {poll.options.map((option, optIndex) => {
                    const percentage = hasVoted
                      ? Math.round((option.votes / totalVotes) * 100)
                      : 0;
                    const isWinning =
                      hasVoted &&
                      option.votes ===
                        Math.max(...poll.options.map((o) => o.votes));

                    return (
                      <motion.button
                        key={optIndex}
                        onClick={() => handleVote(pollIndex, optIndex)}
                        disabled={hasVoted}
                        className={`w-full text-left rounded-lg p-3 text-sm relative overflow-hidden transition-colors border ${
                          hasVoted
                            ? "cursor-default border-border"
                            : "cursor-pointer border-border hover:border-primary/50 hover:bg-accent/50"
                        } ${isWinning ? "border-primary/60 bg-primary/5" : "bg-background"}`}
                        whileHover={!hasVoted ? { scale: 1.02 } : {}}
                        whileTap={!hasVoted ? { scale: 0.98 } : {}}
                      >
                        <AnimatePresence>
                          {hasVoted && (
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{
                                duration: 0.8,
                                ease: "easeOut",
                              }}
                              className={`absolute inset-y-0 left-0 ${
                                isWinning
                                  ? "bg-primary/15"
                                  : "bg-muted/60"
                              } rounded-lg`}
                            />
                          )}
                        </AnimatePresence>

                        <div className="relative z-10 flex items-center justify-between">
                          <span
                            className={`${
                              isWinning
                                ? "font-semibold text-primary"
                                : "text-foreground"
                            }`}
                          >
                            {option.text}
                          </span>
                          {hasVoted && (
                            <motion.span
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className={`text-xs font-bold ml-2 ${
                                isWinning
                                  ? "text-primary"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {percentage}%
                            </motion.span>
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <BarChart3 className="h-3 w-3" />
                    মোট ভোট: {totalVotes}
                  </span>
                  {hasVoted && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex items-center gap-1 text-primary"
                    >
                      <CheckCircle2 className="h-3 w-3" />
                      ভোট দেওয়া হয়েছে
                    </motion.span>
                  )}
                </div>
              </motion.div>
            );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default OpinionPoll;
