import { ThemedComponentThis } from '@connectv/jss-theme';
import { CodedocTheme } from '@codedoc/core';
import { ArticlePreviewStyle } from './style';
import { Buttons, Button, Icon } from '@codedoc/core/components';


export interface ArticlePreviewOptionsBase {
  title: string;
  url: string;
}

export interface ArticlePreviewOptionsWithImage 
  extends ArticlePreviewOptionsBase {
  image: string;
  style: 'card' | 'row' | 'row-reverse';
}

export interface ArticlePreviewOptionsWithOutImage
  extends ArticlePreviewOptionsBase {
}

export type ArticlePreviewOptions =
  ArticlePreviewOptionsWithImage | ArticlePreviewOptionsWithOutImage;

export function isWithImage(options: ArticlePreviewOptions):
  options is ArticlePreviewOptionsWithImage {
  return options && (options as any).image;
}


export function ArticlePreview(
  this: ThemedComponentThis<CodedocTheme>,
  options: ArticlePreviewOptions,
  renderer: any,
  content: any
) {
  const classes = this.theme.classes(ArticlePreviewStyle);
  let style = 'card';
  if (isWithImage(options) && options.style) style = options.style;

  return <div class={`${classes.card} ${style}`}>
    <div class={classes.inside}>
      {isWithImage(options)?
        <a data-bg-image={options.image} class={classes.image} href={options.url} target="_blank"/>
      :''}
      <div>
        <a class={classes.title} href={options.url} target="_blank">{options.title}</a>
        <div class={classes.summary}>
          <a href={options.url} target="_blank">{content}</a>
          <Buttons>
            <a href={options.url} target="_blank">Read Article<Icon align="text-top">navigate_next</Icon></a>
            {/* <Button url={options.url} label="Read More"/> */}
          </Buttons>
        </div>
      </div>
    </div>
  </div>
}


export function ArticlePreviewRow(
  this: ThemedComponentThis<CodedocTheme>,
  _: any,
  renderer: any,
  content: any
) {
  const classes = this.theme.classes(ArticlePreviewStyle);
  return <div class={classes.row}>
    {content}
  </div>
}


export { deferBgImages$ } from './defer-bg-images';