import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function Teamates() {
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Aditya Dutt Pandey",
      designation: "Product Manager",
      src: "https://avatars.githubusercontent.com/u/53257475?v=4",
      linkedin: "https://www.linkedin.com/in/adpandeyadp/",
      github: "https://github.com/Adityaadpandey",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Umyal Dixit",
      designation: "InnovateSphere",
      src: "https://avatars.githubusercontent.com/u/177600914?v=4",
      linkedin: "https://www.linkedin.com/in/umyal-dixit/",
      github: "https://github.com/Umyal06dxt",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Ansh Kumar",
      designation: "Operations Director",
      src: "https://avatars.githubusercontent.com/u/181403091?v=4",
      linkedin: "https://www.linkedin.com/in/ansh-kumar-747009311/",
      github: "https://github.com/anshkumar2311",
    },
  ];

  return <AnimatedTestimonials testimonials={testimonials} />;
}
