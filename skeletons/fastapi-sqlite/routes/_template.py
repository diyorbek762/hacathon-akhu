# TEMPLATE: Copy this file, rename to your resource name, and customize.
# Example: cp _template.py tasks.py → then find/replace "items" with "tasks"

from fastapi import APIRouter, HTTPException
from database import get_db

router = APIRouter()


@router.get("/")
def list_items():
    try:
        db = get_db()
        rows = db.execute("SELECT * FROM items ORDER BY created_at DESC LIMIT 50").fetchall()
        db.close()
        return {"ok": True, "data": [dict(r) for r in rows]}
    except Exception as e:
        print(f"[GET /items] {e}")
        return {"ok": True, "data": []}


@router.get("/{item_id}")
def get_item(item_id: int):
    try:
        db = get_db()
        row = db.execute("SELECT * FROM items WHERE id = ?", (item_id,)).fetchone()
        db.close()
        if not row:
            return {"ok": False, "error": "not found"}
        return {"ok": True, "data": dict(row)}
    except Exception as e:
        print(f"[GET /items/{item_id}] {e}")
        return {"ok": False, "error": "internal error"}


@router.post("/")
def create_item(body: dict):
    try:
        db = get_db()
        # CUSTOMIZE: change column names below
        db.execute(
            "INSERT INTO items (title, description) VALUES (?, ?)",
            (body.get("title", ""), body.get("description", ""))
        )
        db.commit()
        db.close()
        return {"ok": True}
    except Exception as e:
        print(f"[POST /items] {e}")
        return {"ok": False, "error": str(e)}


@router.put("/{item_id}")
def update_item(item_id: int, body: dict):
    try:
        db = get_db()
        # CUSTOMIZE: change SET clause below
        db.execute(
            "UPDATE items SET title = ?, description = ? WHERE id = ?",
            (body.get("title", ""), body.get("description", ""), item_id)
        )
        db.commit()
        db.close()
        return {"ok": True}
    except Exception as e:
        print(f"[PUT /items/{item_id}] {e}")
        return {"ok": False, "error": str(e)}


@router.delete("/{item_id}")
def delete_item(item_id: int):
    try:
        db = get_db()
        db.execute("DELETE FROM items WHERE id = ?", (item_id,))
        db.commit()
        db.close()
        return {"ok": True}
    except Exception as e:
        print(f"[DELETE /items/{item_id}] {e}")
        return {"ok": False, "error": str(e)}
