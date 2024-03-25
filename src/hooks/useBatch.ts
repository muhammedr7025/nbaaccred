import { BatchType } from '@/types/tables'
import { supabase } from '@/utils/supbase/supabaseClient'
import React from 'react'
export type batchHookType = ReturnType<typeof useBatch>
const useBatch = () => {
    const [batch, setBatch] = React.useState<BatchType[]>([])

    function fetch() {
        getBatch().then(setBatch)
    }
    function reload() {
        reloadBatch().then(setBatch)
    }
    function deleter(id: BatchType['id']) {
        deleteBatch(id).then(reload)
            .catch(err => console.log(err))
    }
    async function add(batch: BatchType) {
        const res = await addBatch(batch)
        if (res.status === 201) reload()
        return res
    }
    async function update(batch: BatchType) {
        await updateBatch(batch).then(reload)
    }
    function addBulk(batch: BatchType[]) {
        bulkAddBatch(batch).then(reload)
    }
    return {
        data: batch,
        set: setBatch,
        delete: deleter,
        reload, fetch, add, update, addBulk,
    }
}

export default useBatch

async function getBatch() {
    const batch = getBatchFromSessionStorage()
    if (batch) return batch
    else return await reloadBatch()
}
async function reloadBatch() {
    const batch = await getBatchFromDB()
    storeBatchInSessionStorage(batch)
    return batch
}
async function getBatchFromDB() {
    const res = await supabase.from('batch').select('*')
    const data: BatchType[] = res.data ?? []
    return data
}

function storeBatchInSessionStorage(batch: BatchType[]) {
    if (batch.length === 0) return
    sessionStorage.setItem('batch', JSON.stringify(batch))
}
function getBatchFromSessionStorage() {
    const batch = sessionStorage.getItem('batch')
    if (!batch) return null
    return JSON.parse(batch)
}

async function deleteBatch(batchId: BatchType['id']) {
    if (!batchId) throw new Error('Batch id is required')
    const res = await supabase.from('batch').delete().eq('id', batchId)
    return res
}

async function addBatch(batch: BatchType) {
    const res = await supabase.from('batch').insert(batch)
    return res
}

async function updateBatch(batch: BatchType) {
    const res = await supabase.from('batch').update(batch).eq('id', batch.id)
    return res
}

async function bulkAddBatch(batch: BatchType[]) {
    const res = await supabase.from('batch').upsert(batch, {
        onConflict: 'id'
    })
    return res
}

