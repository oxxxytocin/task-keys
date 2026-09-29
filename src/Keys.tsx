import { IItem } from './index';
import { useState, useEffect } from 'react';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [items, setItems] = useState<IItem[]>(props.initialData);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [tempName, setTempName] = useState<string>('');

    useEffect(() => {
        setItems(props.initialData);
    }, [props.initialData]);

    const sorted = [...items].sort((a, b) =>
        props.sorting === 'ASC' ? a.id - b.id : b.id - a.id,
    );

    return (
        <div>
            {sorted.map((item) => (
                <div key={item.id}>
                    {editingId === item.id ? (
                        <input
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    setItems((prev) =>
                                        prev.map((i) =>
                                            i.id === item.id
                                                ? { ...i, name: tempName }
                                                : i,
                                        ),
                                    );
                                    setEditingId(null);
                                }
                                if (e.key === 'Escape') {
                                    setEditingId(null);
                                }
                            }}
                            autoFocus
                        />
                    ) : (
                        <span
                            onClick={() => {
                                setEditingId(item.id);
                                setTempName(item.name);
                            }}
                        >
                            {item.name}
                        </span>
                    )}
                </div>
            ))}
        </div>
    );
}
