interface PillarCopyEntry {
  diagnosis: string;
  fix: string;
}

type PillarCopyMap = Record<number, PillarCopyEntry>;

export const PILLAR_COPY: Record<string, PillarCopyMap> = {
  lead_generation: {
    4: {
      diagnosis: "You're relying on a single source for leads - word of mouth. That means one slow month, one lost referral partner, or one market shift and your pipeline dries up overnight. You have no control over your lead flow.",
      fix: "Build a simple lead magnet funnel. Even a basic one - a free guide, audit, or checklist - running with $20/day in ads can generate 5-15 leads per day on autopilot.",
    },
    3: {
      diagnosis: "Cold outreach can work, but it's manual and has a ceiling. Your growth is directly capped by how many hours you personally put into prospecting. That's not a system - that's a job.",
      fix: "Add one inbound lead channel (a lead magnet + simple ad) to supplement your outreach. This gives you leads coming in while you sleep.",
    },
    2: {
      diagnosis: "Paid ads are a great channel, but inconsistent results usually mean your funnel or offer needs tuning - not more spend. You're likely paying too much per lead because the landing page or follow-up isn't optimized.",
      fix: "Audit your ad-to-close funnel. Track cost per lead, cost per booked call, and cost per client. Find where the biggest drop-off is and fix that one step first.",
    },
    1: {
      diagnosis: "Multi-channel lead gen is a major strength. You've got diversified sources, which means no single point of failure. Protect this.",
      fix: "Keep optimizing your best channel while maintaining the others. Consider adding AI pre-qualification to filter leads before they hit your calendar.",
    },
  },
  sales_followup: {
    4: {
      diagnosis: "Following up 'when you remember' means leads are going cold every single day. Research shows responding within 5 minutes makes you 21x more likely to close - at 24+ hours, most leads have already talked to a competitor or forgotten why they reached out.",
      fix: "Install speed-to-lead automation today. Set up an automated text + email that fires within 60 seconds of a new lead. This alone can double your close rate with zero extra ad spend.",
    },
    3: {
      diagnosis: "Same-day follow-up is better than most businesses, but without a documented process, hot leads cool off during your busy days. The leads you lose aren't the ones you remember - they're the ones that slip through when you're slammed.",
      fix: "Document your follow-up process: what happens at 5 minutes, 1 hour, 24 hours, 3 days, 7 days. Then automate the first two touchpoints so they happen without you.",
    },
    2: {
      diagnosis: "You have some automation running, which puts you ahead of 80% of businesses. The gap is likely in personalization and timing - generic emails get ignored, but a well-timed personal text after an automated sequence can be the difference.",
      fix: "Add a personal outreach step after your automated sequence. Day 2-3: send a short personal voice note or video text. This hybrid approach closes the gap.",
    },
    1: {
      diagnosis: "Fast automated follow-up plus personal outreach is the gold standard. This is a competitive moat - most of your competitors are still following up manually, if at all.",
      fix: "Optimize your sequences based on data. Which touchpoint gets the most replies? Double down on that. Test different messaging angles quarterly.",
    },
  },
  branding_authority: {
    4: {
      diagnosis: "If a prospect Googles your name and finds nothing, you've already lost the deal before the first conversation. In 2026, no online presence = no trust. Prospects check you out before they ever respond to your outreach.",
      fix: "Start with the basics: a clean one-page authority website and a Google Business profile. Then post 3x/week on one platform where your ideal clients hang out. Consistency beats perfection.",
    },
    3: {
      diagnosis: "Posting without a strategy is like throwing darts blindfolded. Random content doesn't build authority - it builds noise. Your prospects need to see you as the obvious expert, not just 'some person who posts sometimes.'",
      fix: "Pick one core message and one content format. Create content that addresses your ideal client's top 3 fears about the problem you solve. That's your content strategy - keep it that simple.",
    },
    2: {
      diagnosis: "Running ads that don't convert is a positioning problem, not a traffic problem. The eyeballs are there - they're just not convinced. Either the wrong audience is seeing your offer, or your offer isn't compelling enough for the right audience.",
      fix: "Rebuild your ad creative around proof and specifics. Replace vague promises with numbers, timelines, and client results. Test 3 different angles targeting your best-performing audience segment.",
    },
    1: {
      diagnosis: "Being positioned as the go-to expert is a durable competitive advantage that compounds over time. This makes every other part of your business easier - leads trust you faster, sales cycles shorten, and referrals happen naturally.",
      fix: "Level up with video content and case studies. Document client transformations and publish them. This turns your authority from 'known' to 'undeniable.'",
    },
  },
  retention: {
    4: {
      diagnosis: "If most clients are one-and-done, you're rebuilding your revenue from zero every month. Acquiring a new client costs 5-7x more than keeping an existing one. Without retention, you're on a hamster wheel - always hunting, never compounding.",
      fix: "Create a 90-day post-sale check-in sequence. At day 7, day 30, and day 90, reach out with genuine value (not a pitch). This alone can unlock referrals and repeat business from clients who already trust you.",
    },
    3: {
      diagnosis: "Occasional follow-up means you're leaving money on the table with the people who already trust you most - your past clients. A simple, consistent retention system could unlock 20-30% more revenue from your existing client base.",
      fix: "Set up automated check-ins at 30/60/90 days post-sale, plus a quarterly 'what's new' touchpoint. Pair this with a simple referral ask: 'Know anyone else who could use help with [your service]?'",
    },
    2: {
      diagnosis: "Manual upsells work but hit a ceiling fast - they depend on you remembering, having bandwidth, and catching the right timing. Automating even one retention touchpoint can meaningfully increase lifetime value.",
      fix: "Build one automated upsell sequence that triggers 60-90 days after a client's initial purchase. Offer a logical next step, not a random product.",
    },
    1: {
      diagnosis: "Automated retention with referral programs is the ultimate profit lever. You're building compounding revenue while your competitors are still chasing cold leads. This is your strongest asset.",
      fix: "Optimize your referral incentives and track referral conversion rates. Test different rewards. A warm referral closes 4x faster than a cold lead - make sure your program makes it easy for clients to refer.",
    },
  },
};

export function getPillarCopy(pillarId: string, score: number): PillarCopyEntry {
  const pillarMap = PILLAR_COPY[pillarId];
  if (!pillarMap || !pillarMap[score]) {
    return {
      diagnosis: "Analysis unavailable for this configuration.",
      fix: "Review your current systems and identify the biggest bottleneck.",
    };
  }
  return pillarMap[score];
}
