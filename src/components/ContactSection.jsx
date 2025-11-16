import { Linkedin, Mail, MapPin, Phone, SendIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";


export const ContactSection = () => {

    const {toast} = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        setIsSubmitting(true);
        setTimeout(() => {
            toast({
                title: "Message could not be sent",
                description: "Thank you for reaching out. However, the message sending feature is currently unavailable. Please contact me directly via email at jude1rose@outlook.com",
            });
        }, 1500);

        setIsSubmitting(false);
    };
    return (
        <section id="contact" className="py-24 px-4 relative bg-secondary/3">
        <div className="container mx-auto max-w-5xl flex flex-col items-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                Get in <span className="text-primary">Touch</span>
            </h2>

            <p className="text-center mb-12 text-lg text-muted-foreground max-w-2xl mx-auto">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Whether you have a question or just want to say hi, feel free to reach out!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                    <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
                    <div className="space-y-6 justify-center">
                        <div className="flex items-start space-x-4">
                            <div className="p-3 bg-primary/10 rounded-full">
                                <Mail className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-medoi,">Email</h4>
                                <a href="mailto:jude1rose@outlook.com" className="text-muted-foreground hover:text-primary transition-colors">
                                    jude1rose@outlook.com
                                </a>
                                </div>
                        </div>
                         <div className="flex items-start space-x-4">
                            <div className="p-3 bg-primary/10 rounded-full">
                                <Phone className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-medoi,">phone</h4>
                                <a href="tel:+27786686563" className="text-muted-foreground hover:text-primary transition-colors">
                                    +27 (78) 668-6563
                                </a>
                                </div>
                        </div>
                         <div className="flex items-start space-x-4">
                            <div className="p-3 bg-primary/10 rounded-full">
                                <MapPin className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-medoi,">Location</h4>
                                <a href="https://www.google.com/maps/place/Cape+Town,+South+Africa" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                    Cape Town, South Africa
                                </a>
                                </div>
                        </div>

                        <div className="pt-8">
                            <h4> Connect With Me</h4>
                            <div className="flex space-x-4 justify-center">
                                <a href="https://linkedin.com/in/jude-rose" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                                    <Linkedin />
                                </a>
                            </div>
                        </div>
                        </div>
                        </div>

                        <div className="bg-card p-8 rounded-lg shadow-xs">
                            <h3 className="text-2xl font-semibold mb-6">Send Me a Message</h3>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="name" className="block text-sm mb-2 font-medium">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="w-full px-4 py-3 border border-input bg-background rounded-md focus:outline-hidden focus:ring-2 focus:ring-primary"
                                        placeholder="Jude Rose"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm mb-2 font-medium">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="w-full px-4 py-3 border border-input bg-background rounded-md focus:outline-hidden focus:ring-2 focus:ring-primary"
                                        placeholder="hello@example.com"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm mb-2 font-medium">
                                        Message
                                    </label>
                                    <textarea
                                            id="message"
                                        name="message"
                                        className="w-full px-4 py-3 border border-input bg-background rounded-md focus:outline-hidden focus:ring-2 focus:ring-primary resize-none"
                                        placeholder="Your message here..."
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={cn(
                                        "buttons w-full flex items-center justify-center gap-2",
                                        
                                    )}
                                >
                                    {isSubmitting ? "Sending..." : "Send Message"} <SendIcon size={16} />
                                </button>
                            </form>
                </div>
            </div>
        </div>
        </section>
    );
}