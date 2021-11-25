export class TreeNode {
  public value: number
  left: TreeNode | null
  right: TreeNode | null

  constructor(value: number) {
    this.value = value
    this.left = null
    this.right = null
  }
}

export class TreeNodeWithNext {
  public val: number
  public left: TreeNodeWithNext | null
  public right: TreeNodeWithNext | null
  public next: TreeNodeWithNext | null

  constructor(val: number) {
    this.val = val
    this.left = null
    this.right = null
    this.next = null
  }
}
