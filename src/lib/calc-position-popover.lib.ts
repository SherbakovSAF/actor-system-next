import { PosDetail_T } from "@/types/general.types";

export class CalcPositionPopover {
  trigger: DOMRect;
  overlay: DOMRect;
  margin: number;
  leftPosition = -100;
  topPosition = -100;
  position: PosDetail_T;

  constructor(
    trigger: DOMRect,
    overlay: DOMRect,
    margin?: number,
    position?: PosDetail_T
  ) {
    this.trigger = trigger;
    this.overlay = overlay;
    this.margin = margin ?? 4;
    this.position = position ?? "bottom";
  }

  get getRules() {
    const { innerHeight: viewportHeight, innerWidth: viewportWidth } = window;
    const {
      width: triggerWidth,
      left: triggerLeft,
      height: triggerHeight,
      top: triggerTop,
    } = this.trigger;
    const { width: overlayWidth, height: overlayHeight } = this.overlay;

    return [
      {
        pos: "right",
        rule: () => triggerLeft + triggerWidth + overlayWidth <= viewportWidth,
        calcPosition: () => {
          this.leftPosition = triggerLeft + triggerWidth + this.margin;
          this.topPosition = triggerTop + triggerHeight / 2 - overlayHeight / 2;
        },
      },
      {
        pos: "right-start",
        rule: () => triggerLeft + triggerWidth + overlayWidth <= viewportWidth,
        calcPosition: () => {
          this.leftPosition = triggerLeft + triggerWidth + this.margin;
          this.topPosition = triggerTop;
        },
      },
      {
        pos: "right-end",
        rule: () => triggerLeft + triggerWidth + overlayWidth <= viewportWidth,
        calcPosition: () => {
          this.leftPosition = triggerLeft + triggerWidth + this.margin;
          this.topPosition = triggerTop + triggerHeight - overlayHeight;
        },
      },
      {
        pos: "left",
        rule: () => triggerLeft - overlayWidth >= 0,
        calcPosition: () => {
          this.leftPosition = triggerLeft - overlayWidth - this.margin;
          this.topPosition = triggerTop + triggerHeight / 2 - overlayHeight / 2;
        },
      },
      {
        pos: "left-start",
        rule: () => triggerLeft - overlayWidth >= 0,
        calcPosition: () => {
          this.leftPosition = triggerLeft - overlayWidth - this.margin;
          this.topPosition = triggerTop;
        },
      },
      {
        pos: "left-end",
        rule: () => triggerLeft - overlayWidth >= 0,
        calcPosition: () => {
          this.leftPosition = triggerLeft - overlayWidth - this.margin;
          this.topPosition = triggerTop + triggerHeight - overlayHeight;
        },
      },
      {
        pos: "bottom",
        rule: () =>
          triggerTop + triggerHeight + overlayHeight <= viewportHeight,
        calcPosition: () => {
          this.topPosition = triggerTop + triggerHeight + this.margin;
          this.leftPosition = triggerLeft + triggerWidth / 2 - overlayWidth / 2;
        },
      },
      {
        pos: "bottom-start",
        rule: () =>
          triggerTop + triggerHeight + overlayHeight <= viewportHeight,
        calcPosition: () => {
          this.topPosition = triggerTop + triggerHeight + this.margin;
          this.leftPosition = triggerLeft;
        },
      },
      {
        pos: "bottom-end",
        rule: () =>
          triggerTop + triggerHeight + overlayHeight <= viewportHeight,
        calcPosition: () => {
          this.topPosition = triggerTop + triggerHeight + this.margin;
          this.leftPosition = triggerLeft + triggerWidth - overlayWidth;
        },
      },
      {
        pos: "top",
        rule: () => triggerTop - overlayHeight >= 0,
        calcPosition: () => {
          this.topPosition = triggerTop - overlayHeight - this.margin;
          this.leftPosition = triggerLeft + triggerWidth / 2 - overlayWidth / 2;
        },
      },
      {
        pos: "top-start",
        rule: () => triggerTop - overlayHeight >= 0,
        calcPosition: () => {
          this.topPosition = triggerTop - overlayHeight - this.margin;
          this.leftPosition = triggerLeft;
        },
      },
      {
        pos: "top-end",
        rule: () => triggerTop - overlayHeight >= 0,
        calcPosition: () => {
          this.topPosition = triggerTop - overlayHeight - this.margin;
          this.leftPosition = triggerLeft + triggerWidth - overlayWidth;
        },
      },
    ];
  }

  get getNamePos() {
    let defaultPosition: PosDetail_T = "left";
    for (const rule of this.getRules) {
      if (rule.rule()) defaultPosition = rule.pos as PosDetail_T;
    }
    return defaultPosition;
  }

  get isPositionValid(): boolean {
    for (const rule of this.getRules) {
      if (rule.pos === this.position) return rule.rule();
    }
    return false;
  }

  get getCoordsByPosition() {
    const finalPosition =
      this.position && this.isPositionValid ? this.position : this.getNamePos;

    for (const rule of this.getRules) {
      if (finalPosition === rule.pos) {
        rule.calcPosition();
      }
    }

    return { top: this.topPosition, left: this.leftPosition };
  }
}
