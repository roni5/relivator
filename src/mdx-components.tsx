/**
 * This file allows you to provide custom React components
 * to be used in MDX files. You can import and use any React
 * component you want, including components from other libraries.
 * @see https://nextjs.org/docs/app/building-your-application/configuring/mdx
 */

import Image from "next/image";
import { cn } from "~/utils";
import { type MDXComponents } from "mdx/types";

import { MdxCard } from "~/islands/modules/cards/mdx-card";
import { Callout } from "~/islands/modules/markdown/callout";
import { CodeBlock } from "~/islands/modules/markdown/code-block";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "~/islands/primitives/alert";
import { AspectRatio } from "~/islands/primitives/aspect-ratio";

// These types are required to make the related components work with `useMDXComponent`
// They used to work without these types, but now they don't for some reason
type ImageProps = React.ComponentProps<typeof Image>;
type AlertProps = React.ComponentProps<typeof Alert>;
type AlertTitleProps = React.ComponentProps<typeof AlertTitle>;
type AlertDescriptionProps = React.ComponentProps<typeof AlertDescription>;
type AspectRatioProps = React.ComponentProps<typeof AspectRatio>;

const components = {
  h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn("mt-2 scroll-m-20 text-4xl font-bold", className)}
      {...props}
    />
  ),
  h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "mt-10 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h5
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h6
      className={cn(
        "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.HTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className={cn(
        "text-base leading-7 [&:not(:first-child)]:mt-5",
        className,
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  ),
  img: ({
    className,
    alt,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md", className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
    <hr className="my-4 md:my-8" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("m-0 border-t p-0 even:bg-muted", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  ),
  pre: CodeBlock,
  code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className,
      )}
      {...props}
    />
  ),
  Image: ({ className, alt, ...props }: ImageProps) => (
    <Image className={cn(className, "mt-4")} alt={alt} {...props} />
  ),
  Alert: ({ className, ...props }: AlertProps) => (
    <Alert className={cn(className)} {...props} />
  ),
  AlertTitle: ({ className, ...props }: AlertTitleProps) => (
    <AlertTitle className={cn(className)} {...props} />
  ),
  AlertDescription: ({ className, ...props }: AlertDescriptionProps) => (
    <AlertDescription className={cn(className)} {...props} />
  ),
  AspectRatio: ({ className, ...props }: AspectRatioProps) => (
    <AspectRatio className={cn(className)} {...props} />
  ),
  Card: MdxCard,
  Callout,
};

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  // @ts-expect-error
  const Component = useMDXComponent(code);

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Built-in components customizing, adding styling, and much more other.
    h1: ({ children }) => <h1 style={{ fontSize: "64px" }}>{children}</h1>,
    ...components,
  };
}
