export class DoubleHeapUtils<T> {
    
    private compareField: keyof T;
    private maxHeap: Node<T> | null = null;
    private size: number = 0;

    constructor(compareField: keyof T) {
        this.compareField = compareField;
    }

    public initHeap(values: T[], isMaxHeap: boolean = true): void {
        this.maxHeap = null;
        this.size = 0;
        
        for (const value of values) {
            this.insert(value, isMaxHeap);
        }
    }

    public insert(value: T, isMaxHeap: boolean = true): void {
        const newNode = new Node(value, null, null, null);
        
        if (!this.maxHeap) {
            this.maxHeap = newNode;
            this.size = 1;
            return;
        }

        // Find insertion position (use level-order traversal to find first node with empty slot)
        const queue: Node<T>[] = [this.maxHeap];
        let parent: Node<T> | null = null;
        
        while (queue.length > 0) {
            parent = queue.shift()!;
            
            if (!parent.getLeft()) {
                newNode.setParent(parent);
                parent.setLeft(newNode);
                break;
            } else if (!parent.getRight()) {
                newNode.setParent(parent);
                parent.setRight(newNode);
                break;
            } else {
                queue.push(parent.getLeft()!);
                queue.push(parent.getRight()!);
            }
        }

        this.size++;
        this.heapifyUp(newNode, isMaxHeap);
    }

    private heapifyUp(node: Node<T>, isMaxHeap: boolean): void {
        let current = node;
        
        while (current.getParent() !== null) {
            const parent = current.getParent()!;
            const shouldSwap = isMaxHeap 
                ? this.compare(current.getValue(), parent.getValue()) > 0
                : this.compare(current.getValue(), parent.getValue()) < 0;
            
            if (shouldSwap) {
                this.swap(current, parent);
                current = parent;
            } else {
                break;
            }
        }
    }

    public extract(isMaxHeap: boolean = true): T | null {
        if (!this.maxHeap) return null;
        
        const rootValue = this.maxHeap.getValue();
        
        if (this.size === 1) {
            this.maxHeap = null;
            this.size = 0;
            return rootValue;
        }

        // Find the last node
        const lastNode = this.findLastNode();
        if (!lastNode) return rootValue;

        // Move the last node's value to the root
        this.maxHeap.setValue(lastNode.getValue());
        
        // Remove the last node
        const parent = lastNode.getParent();
        if (parent) {
            if (parent.getLeft() === lastNode) {
                parent.setLeft(null);
            } else {
                parent.setRight(null);
            }
        }
        
        this.size--;
        this.heapifyDown(this.maxHeap, isMaxHeap);
        
        return rootValue;
    }

    private heapifyDown(node: Node<T>, isMaxHeap: boolean): void {
        let current = node;
        
        while (true) {
            let target = current;
            const left = current.getLeft();
            const right = current.getRight();
            
            if (left) {
                const leftCompare = this.compare(left.getValue(), target.getValue());
                const shouldSwapLeft = isMaxHeap 
                    ? leftCompare > 0
                    : leftCompare < 0;
                
                if (shouldSwapLeft) {
                    target = left;
                }
            }
            
            if (right) {
                const rightCompare = this.compare(right.getValue(), target.getValue());
                const shouldSwapRight = isMaxHeap 
                    ? rightCompare > 0
                    : rightCompare < 0;
                
                if (shouldSwapRight) {
                    target = right;
                }
            }
            
            if (target === current) break;
            
            this.swap(current, target);
            current = target;
        }
    }

    private findLastNode(): Node<T> | null {
        if (!this.maxHeap) return null;
        
        const queue: Node<T>[] = [this.maxHeap];
        let lastNode: Node<T> | null = null;
        
        while (queue.length > 0) {
            lastNode = queue.shift()!;
            
            if (lastNode.getLeft()) {
                queue.push(lastNode.getLeft()!);
            }
            if (lastNode.getRight()) {
                queue.push(lastNode.getRight()!);
            }
        }
        
        return lastNode;
    }

    // Original compare and swap methods remain unchanged
    private compare(a: T, b: T): number {
        const aValue = a[this.compareField];
        const bValue = b[this.compareField];
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    }

    private swap(node1: Node<T>, node2: Node<T>): void {
        const temp = node1.getValue();
        node1.setValue(node2.getValue());
        node2.setValue(temp);
    }

    public getSize(): number {
        return this.size;
    }

    public peek(): T | null {
        return this.maxHeap ? this.maxHeap.getValue() : null;
    }
}

class Node<T> {

    private value: T;
    private parent: Node<T> | null;
    private left: Node<T> | null;
    private right: Node<T> | null;

    constructor(value: T, parent: Node<T> | null, left: Node<T> | null, right: Node<T> | null) {
        this.value = value;
        this.parent = parent;
        this.left = left;
        this.right = right;
    }

    public getValue(): T {
        return this.value;
    }

    public getParent(): Node<T> | null {
        return this.parent;
    }

    public getLeft(): Node<T> | null {
        return this.left;
    }

    public setLeft(left: Node<T> | null): void {
        this.left = left;
    }

    public setRight(right: Node<T> | null): void {
        this.right = right;
    }

    public getRight(): Node<T> | null {
        return this.right;
    }

    public setValue(value: T): void {
        this.value = value;
    }

    public setParent(parent: Node<T> | null): void {
        this.parent = parent;
    }
}