
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function ChairmanMessageSection() {
    const chairmanImage = PlaceHolderImages.find(p => p.id === 'founder-image');
    return (
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                    <div className="md:col-span-1 flex justify-center">
                        {chairmanImage && (
                            <Avatar className="w-48 h-48 border-4 border-background">
                                <AvatarImage src={chairmanImage.imageUrl} alt="Ansh Vaishy" data-ai-hint={chairmanImage.imageHint} />
                                <AvatarFallback>AV</AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                    <div className="md:col-span-2 text-center md:text-left">
                        <h3 className="text-2xl font-headline font-bold mb-4">Message from the Chairman</h3>
                        <p className="text-lg italic">&ldquo;Our institution stands as a testament to the power of sharp intellect and enduring ambition. At Obsidian Peak, we do not just prepare you for a career; we prepare you to define the future.&rdquo;</p>
                        <p className="mt-4 font-semibold">Ansh Vaishy</p>
                        <p className="text-sm text-primary-foreground/80">Chairman, Board of Governors</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
