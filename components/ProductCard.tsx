import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogImage,
  DialogSubtitle,
  DialogClose,
  DialogDescription,
  DialogContainer,
} from "@/components/Dialog";
import { IProduct } from "@/lib/products";
import { CheckIcon, PlusIcon, ShoppingCart } from "lucide-react";
import { AnimatedSubscribeButton } from "./magicui/animated-subscribe-button";

export default function ProductCard({ product }: { product: IProduct }) {
  return (
    <Dialog
      transition={{
        type: "spring",
        bounce: 0.05,
        duration: 0.25,
      }}
    >
      <DialogTrigger
        style={{
          borderRadius: "12px",
        }}
        className="flex max-w-[270px] flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900"
      >
        <DialogImage
          src={product.image}
          alt={product.alt}
          className="h-full w-full "
        />
        <div className="flex flex-grow flex-row items-end justify-between p-2">
          <div>
            <DialogTitle className="text-zinc-950 dark:text-zinc-50">
              {product.name}
            </DialogTitle>
            <DialogSubtitle className="text-zinc-700 dark:text-zinc-400">
              {product.shortDescription}
            </DialogSubtitle>
          </div>
          <button
            type="button"
            className="relative ml-1 flex h-6 w-6 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:bg-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-500"
            aria-label="Open dialog"
          >
            <PlusIcon size={12} />
          </button>
        </div>
      </DialogTrigger>
      <DialogContainer>
        <DialogContent
          style={{
            borderRadius: "24px",
          }}
          className="pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 sm:w-[500px]"
        >
          <DialogImage
            src={product.image}
            alt={product.alt}
            className=" max-h-[50vh] w-full"
          />
          <div className="p-6">
            <DialogTitle className="text-2xl text-zinc-950 dark:text-zinc-50 ">
              {product.name}
              <AnimatedSubscribeButton
                buttonColor="#000000"
                buttonTextColor="#ffffff"
                subscribeStatus={false}
                initialText={
                  <span className="group inline-flex items-center text-lg">
                    Add to cart
                    <ShoppingCart className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                }
                changeText={
                  <span className="group inline-flex items-center text-lg">
                    <CheckIcon className="mr-2 h-4 w-4" />
                    Added to cart
                  </span>
                }
              />
            </DialogTitle>
            <DialogSubtitle className="text-zinc-700 dark:text-zinc-400">
              {product.shortDescription}
            </DialogSubtitle>
            <DialogDescription
              disableLayoutAnimation
              variants={{
                initial: { opacity: 0, scale: 0.8, y: 100 },
                animate: { opacity: 1, scale: 1, y: 0 },
                exit: { opacity: 0, scale: 0.8, y: 100 },
              }}
            >
              <p className="mt-2 text-zinc-500 dark:text-zinc-500">
                {product.description}
              </p>
            </DialogDescription>
          </div>
          <DialogClose className="text-zinc-50" />
        </DialogContent>
      </DialogContainer>
    </Dialog>
  );
}
