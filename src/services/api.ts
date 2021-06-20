import firestore from '@react-native-firebase/firestore'

export const getDocRef = (collectionPath: string) => {
    return firestore().collection(collectionPath)
}

export const deleteDoc = async (collection: string, id?: string) => {
    const docRef = firestore().collection(collection).doc(id)
    await docRef.delete()
}
