import React from 'react';
import Marquee from 'react-fast-marquee';

interface TestimonialCard {
  id: number;
  name: string;
  username: string;
  content: string;
  avatar: string;
}

const testimonials: TestimonialCard[] = [
  {
    "id": 1,
    "name": "Hitesh",
    "username": "@hitesh",
    "content": "Lowkey didn't expect much but omg it's fire 🔥",
    "avatar": "https://avatar.vercel.sh/jack"
  },
  {
    "id": 2,
    "name": "Nishant",
    "username": "@femb",
    "content": "Ngl, this kinda ate. Might be their best work yet.",
    "avatar": "https://avatar.vercel.sh/jill"
  },
  {
    "id": 3,
    "name": "Vaibhav",
    "username": "@vaibhav",
    "content": "I was struggling and then I saw theirs… instant inspo. Came in clutch fr",
    "avatar": "https://avatar.vercel.sh/john"
  },
  {
    "id": 4,
    "name": "Siddharth",
    "username": "@siddharth",
    "content": "If I hadn't ordered their assignment, I probably would've missed the deadline",
    "avatar": "https://avatar.vercel.sh/jane"
  },
  {
    "id": 5,
    "name": "Vasu",
    "username": "@vasu",
    "content": "Saw the reviews, gave it a shot — not disappointed at all.",
    "avatar": "https://avatar.vercel.sh/jenny"
  },
  {
    "id": 6,
    "name": "Aayush",
    "username": "@ayush",
    "content": "Lowkey didn't think they'd pull it off but they nailed it.",
    "avatar": "https://avatar.vercel.sh/james"
  },
  {
    "id": 7,
    "name": "Jinx",
    "username": "@powder",
    "content": "Lowkey didn't think they'd pull it off but they nailed it.",
    "avatar": "https://avatar.vercel.sh/james"
  },
  {
    "id": 8,
    "name": "Akash",
    "username": "@anst",
    "content": "Lowkey didn't think they'd pull it off but they nailed it.",
    "avatar": "https://avatar.vercel.sh/james"
  },
  {
    "id": 9,
    "name": "Rahul",
    "username": "@rahul",
    "content": "Best service ever! Got my assignment done in time with amazing quality.",
    "avatar": "https://avatar.vercel.sh/rahul"
  },
  {
    "id": 10,
    "name": "Priya",
    "username": "@priya",
    "content": "Professional work, delivered exactly what I needed. Highly recommended!",
    "avatar": "https://avatar.vercel.sh/priya"
  },
  {
    "id": 11,
    "name": "Arjun",
    "username": "@arjun",
    "content": "Saved my grades with their excellent assignment help. Thank you!",
    "avatar": "https://avatar.vercel.sh/arjun"
  },
  {
    "id": 12,
    "name": "Kavya",
    "username": "@kavya",
    "content": "Fast delivery and top-notch quality. Will definitely use again.",
    "avatar": "https://avatar.vercel.sh/kavya"
  }
];

const TestimonialCard: React.FC<{ testimonial: TestimonialCard }> = ({ testimonial }) => {
  return (
    <div className="mx-3 p-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 min-w-[320px] max-w-[320px]">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 rounded-full ${testimonial.avatar} flex items-center justify-center text-white font-semibold text-sm`}>
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-semibold text-white">{testimonial.name}</h3>
          <p className="text-sm text-white/70">{testimonial.username}</p>
        </div>
      </div>
      <p className="text-white/90 leading-relaxed">
        {testimonial.content}
      </p>
    </div>
  );
};

const TestimonialMarquee: React.FC = () => {
  // Duplicate testimonials to ensure continuous scrolling without empty slots
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];
  const firstRow = extendedTestimonials.slice(0, Math.ceil(extendedTestimonials.length / 2));
  const secondRow = extendedTestimonials.slice(Math.ceil(extendedTestimonials.length / 2));

  return (
    <div className="w-full bg-gradient-to-br  #0A0F1F py-20 overflow-hidden">
      <div className="w-full">
        <div className="space-y-8">
          {/* First row - left to right */}
          <Marquee
            gradient={false}
            speed={40}
            pauseOnHover={true}
            className="overflow-hidden"
          >
            {firstRow.map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
            ))}
          </Marquee>

          {/* Second row - right to left */}
          <Marquee
            gradient={false}
            speed={40}
            direction="right"
            pauseOnHover={true}
            className="overflow-hidden"
          >
            {secondRow.map((testimonial, index) => (
              <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} />
            ))}
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default TestimonialMarquee;