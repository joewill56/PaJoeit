import { LanguageCode } from '../languages';

export interface BatchStrings {
  upTo50Images: string;
  limit50Warning: string;
  limitExceededNotice: (currentCount: number, allowedCount: number) => string;
  batchProcessedSummary: (success: number, total: number) => string;
  batchFailedSummary: (failed: number) => string;
  retryFailed: string;
  clearCompleted: string;
  zipTooLargeWarning: string;
}

export const BATCH_TRANSLATIONS: Record<LanguageCode, BatchStrings> = {
  en: {
    upTo50Images: 'Up to 50 images per batch',
    limit50Warning: 'You can process up to 50 images at a time. Please remove some images and try again.',
    limitExceededNotice: (current, allowed) =>
      allowed > 0
        ? `Maximum 50 images per batch. ${current} images are already selected, so only ${allowed} more can be added.`
        : 'Maximum 50 images per batch reached. 50 images are already selected in the workspace.',
    batchProcessedSummary: (success, total) => `${success} of ${total} images processed successfully.`,
    batchFailedSummary: (failed) => `${failed} ${failed === 1 ? 'image' : 'images'} could not be processed.`,
    retryFailed: 'Retry Failed Images',
    clearCompleted: 'Clear Completed',
    zipTooLargeWarning:
      'Your files were processed successfully, but this ZIP is too large for this device to create reliably. Please download the files individually or create smaller batches.',
  },

  es: {
    upTo50Images: 'Hasta 50 imágenes por lote',
    limit50Warning: 'Puedes procesar hasta 50 imágenes a la vez. Elimina algunas imágenes e inténtalo de nuevo.',
    limitExceededNotice: (current, allowed) =>
      allowed > 0
        ? `Máximo 50 imágenes por lote. Ya hay ${current} seleccionadas, por lo que solo se pueden añadir ${allowed} más.`
        : 'Máximo 50 imágenes por lote alcanzado. Ya hay 50 imágenes seleccionadas en el espacio de trabajo.',
    batchProcessedSummary: (success, total) => `${success} de ${total} imágenes procesadas con éxito.`,
    batchFailedSummary: (failed) => `${failed} ${failed === 1 ? 'imagen no se pudo procesar' : 'imágenes no se pudieron procesar'}.`,
    retryFailed: 'Reintentar fallidas',
    clearCompleted: 'Limpiar completadas',
    zipTooLargeWarning:
      'Los archivos se procesaron con éxito, pero este archivo ZIP es demasiado grande para crearse de forma fiable en este dispositivo. Descárgalos individualmente o en lotes más pequeños.',
  },

  fr: {
    upTo50Images: 'Jusqu\'à 50 images par lot',
    limit50Warning: 'Vous pouvez traiter jusqu\'à 50 images à la fois. Veuillez supprimer quelques images et réessayer.',
    limitExceededNotice: (current, allowed) =>
      allowed > 0
        ? `Maximum 50 images par lot. ${current} images sont déjà sélectionnées, seules ${allowed} de plus peuvent être ajoutées.`
        : 'Maximum de 50 images par lot atteint. 50 images sont déjà sélectionnées.',
    batchProcessedSummary: (success, total) => `${success} sur ${total} images traitées avec succès.`,
    batchFailedSummary: (failed) => `${failed} ${failed === 1 ? 'image n\'a pas pu être traitée' : 'images n\'ont pas pu être traitées'}.`,
    retryFailed: 'Réessayer les échecs',
    clearCompleted: 'Effacer les terminées',
    zipTooLargeWarning:
      'Vos fichiers ont été traités avec succès, mais ce fichier ZIP est trop volumineux pour cet appareil. Veuillez télécharger les fichiers individuellement ou créer des lots plus petits.',
  },

  de: {
    upTo50Images: 'Bis zu 50 Bilder pro Stapel',
    limit50Warning: 'Sie können bis zu 50 Bilder gleichzeitig verarbeiten. Bitte entfernen Sie einige Bilder und versuchen Sie es erneut.',
    limitExceededNotice: (current, allowed) =>
      allowed > 0
        ? `Maximal 50 Bilder pro Stapel. ${current} Bilder sind bereits ausgewählt, es können nur noch ${allowed} hinzugefügt werden.`
        : 'Maximal 50 Bilder pro Stapel erreicht. Es befinden sich bereits 50 Bilder im Arbeitsbereich.',
    batchProcessedSummary: (success, total) => `${success} von ${total} Bildern erfolgreich verarbeitet.`,
    batchFailedSummary: (failed) => `${failed} ${failed === 1 ? 'Bild konnte nicht verarbeitet werden' : 'Bilder konnten nicht verarbeitet werden'}.`,
    retryFailed: 'Fehlgeschlagene wiederholen',
    clearCompleted: 'Abgeschlossene leeren',
    zipTooLargeWarning:
      'Ihre Dateien wurden erfolgreich verarbeitet, aber diese ZIP-Datei ist zu groß für dieses Gerät. Bitte laden Sie die Dateien einzeln herunter oder erstellen Sie kleinere Stapel.',
  },

  pt: {
    upTo50Images: 'Até 50 imagens por lote',
    limit50Warning: 'Você pode processar até 50 imagens por vez. Remova algumas imagens e tente novamente.',
    limitExceededNotice: (current, allowed) =>
      allowed > 0
        ? `Máximo de 50 imagens por lote. ${current} imagens já foram selecionadas, apenas mais ${allowed} podem ser adicionadas.`
        : 'Limite de 50 imagens por lote atingido. Já existem 50 imagens selecionadas.',
    batchProcessedSummary: (success, total) => `${success} de ${total} imagens processadas com sucesso.`,
    batchFailedSummary: (failed) => `${failed} ${failed === 1 ? 'imagem não pôde ser processada' : 'imagens não puderam ser processadas'}.`,
    retryFailed: 'Tentar novamente com falhas',
    clearCompleted: 'Limpar concluídas',
    zipTooLargeWarning:
      'Seus arquivos foram processados com sucesso, mas este ZIP é grande demais para este dispositivo. Baixe os arquivos individualmente ou processe em lotes menores.',
  },

  ar: {
    upTo50Images: 'حتى 50 صورة في الدفعة الواحدة',
    limit50Warning: 'يمكنك معالجة ما يصل إلى 50 صورة في المرة الواحدة. يرجى إزالة بعض الصور والمحاولة مجدداً.',
    limitExceededNotice: (current, allowed) =>
      allowed > 0
        ? `الحد الأقصى 50 صورة لكل دفعة. تم تحديد ${current} صورة بالفعل، لذلك يمكن إضافة ${allowed} فقط.`
        : 'تم الوصول إلى الحد الأقصى (50 صورة). يوجد بالفعل 50 صورة في مساحة العمل.',
    batchProcessedSummary: (success, total) => `تمت معالجة ${success} من أصل ${total} صورة بنجاح.`,
    batchFailedSummary: (failed) => `تعذرت معالجة ${failed} من الصور.`,
    retryFailed: 'إعادة محاولة الصور غير المكتملة',
    clearCompleted: 'مسح المكتملة',
    zipTooLargeWarning:
      'تمت معالجة ملفاتك بنجاح، لكن ملف ZIP كبير جداً بالنسبة لهذا الجهاز. يرجى تنزيل الملفات بشكل فردي أو إنشاء دفعات أصغر.',
  },

  hi: {
    upTo50Images: 'प्रति बैच 50 छवियों तक',
    limit50Warning: 'आप एक बार में 50 छवियों तक प्रोसेस कर सकते हैं। कृपया कुछ छवियां हटाएं और पुनः प्रयास करें।',
    limitExceededNotice: (current, allowed) =>
      allowed > 0
        ? `प्रति बैच अधिकतम 50 छवियां। ${current} छवियां पहले से चयनित हैं, केवल ${allowed} और जोड़ी जा सकती हैं।`
        : 'प्रति बैच अधिकतम 50 छवियों की सीमा पूर्ण हो गई है। 50 छवियां पहले से चयनित हैं।',
    batchProcessedSummary: (success, total) => `${total} में से ${success} छवियां सफलतापूर्वक प्रोसेस की गईं।`,
    batchFailedSummary: (failed) => `${failed} छवियों को प्रोसेस नहीं किया जा सका।`,
    retryFailed: 'असफल छवियों को पुनः प्रयास करें',
    clearCompleted: 'पूर्ण हटाएं',
    zipTooLargeWarning:
      'आपकी फाइलें सफलतापूर्वक प्रोसेस हो गईं, लेकिन यह ज़िप इस डिवाइस के लिए बहुत बड़ी है। कृपया फ़ाइलों को व्यक्तिगत रूप से डाउनलोड करें।',
  },

  id: {
    upTo50Images: 'Hingga 50 gambar per batch',
    limit50Warning: 'Anda dapat memproses hingga 50 gambar sekaligus. Harap hapus beberapa gambar dan coba lagi.',
    limitExceededNotice: (current, allowed) =>
      allowed > 0
        ? `Maksimal 50 gambar per batch. ${current} gambar sudah dipilih, hanya ${allowed} gambar lagi yang dapat ditambahkan.`
        : 'Maksimal 50 gambar per batch tercapai. Sudah ada 50 gambar di ruang kerja.',
    batchProcessedSummary: (success, total) => `${success} dari ${total} gambar berhasil diproses.`,
    batchFailedSummary: (failed) => `${failed} gambar tidak dapat diproses.`,
    retryFailed: 'Coba Lagi yang Gagal',
    clearCompleted: 'Hapus yang Selesai',
    zipTooLargeWarning:
      'File Anda berhasil diproses, namun file ZIP ini terlalu besar untuk perangkat ini. Silakan unduh file satu per satu atau buat batch yang lebih kecil.',
  },

  zh: {
    upTo50Images: '每批最多 50 张图片',
    limit50Warning: '一次最多可处理 50 张图片。请移除部分图片后重试。',
    limitExceededNotice: (current, allowed) =>
      allowed > 0
        ? `每批最多 50 张图片。已选择 ${current} 张，因此只能再添加 ${allowed} 张。`
        : '已达到每批 50 张图片的上限。工作区中已有 50 张图片。',
    batchProcessedSummary: (success, total) => `成功处理 ${total} 张中的 ${success} 张图片。`,
    batchFailedSummary: (failed) => `${failed} 张图片无法处理。`,
    retryFailed: '重试失败图片',
    clearCompleted: '清除已完成',
    zipTooLargeWarning:
      '您的文件已成功处理，但生成的 ZIP 文件对此设备过大。请单独下载文件或分批处理。',
  },

  ja: {
    upTo50Images: '1バッチあたり最大50枚',
    limit50Warning: '一度に処理できる画像は最大50枚です。いくつかの画像を削除してから再試行してください。',
    limitExceededNotice: (current, allowed) =>
      allowed > 0
        ? `1バッチあたり最大50枚です。現在${current}枚選択されているため、追加できるのはあと${allowed}枚です。`
        : '1バッチあたり最大50枚に達しました。すでに50枚選択されています。',
    batchProcessedSummary: (success, total) => `${total}枚中${success}枚の画像を正常に処理しました。` ,
    batchFailedSummary: (failed) => `${failed}枚の画像を処理できませんでした。`,
    retryFailed: '失敗した画像を再試行',
    clearCompleted: '完了をクリア',
    zipTooLargeWarning:
      'ファイルは正常に処理されましたが、このZIPファイルはお使いのデバイスで作成するには大きすぎます。ファイルを個別にダウンロードするか、より小さなバッチで作成してください。',
  },
};
