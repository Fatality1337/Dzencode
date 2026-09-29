import re
import os

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Add useTranslation and useAppSelector for currency if not present
    if "useTranslation" not in content:
        content = re.sub(
            r"import \{ useAppDispatch, useAppSelector \} from '../../app/store/hooks';",
            "import { useTranslation } from 'react-i18next';\nimport { useAppDispatch, useAppSelector } from '../../app/store/hooks';",
            content
        )
    
    # Add t and currency inside the component
    if "const { t } = useTranslation();" not in content:
        content = re.sub(
            r"(const dispatch = useAppDispatch\(\);)",
            r"const { t } = useTranslation();\n  const currency = useAppSelector(state => state.settings.currency);\n  \1",
            content
        )

    # Replace currency formatting
    # formatCurrency(statistics.totalValue, 'USD') -> formatCurrency(convertPrice(statistics.totalValue, 'USD', currency), currency)
    content = re.sub(
        r"formatCurrency\(([^,]+),\s*'USD'\)",
        r"formatCurrency(convertPrice(\1, 'USD', currency), currency)",
        content
    )
    
    # formatCurrency(product.price, product.currency) -> formatCurrency(convertPrice(product.price, product.currency, currency), currency)
    content = re.sub(
        r"formatCurrency\(([^,]+),\s*([a-zA-Z\.]+currency)\)",
        r"formatCurrency(convertPrice(\1, \2, currency), currency)",
        content
    )

    # Remove EUR secondary display
    # <small>{formatCurrency(convertPrice(total, 'USD', 'EUR'), 'EUR')}</small>
    content = re.sub(
        r"<small>\{formatCurrency\(convertPrice\([^,]+,\s*'[^']+',\s*'EUR'\),\s*'EUR'\)\}</small>",
        r"",
        content
    )
    content = re.sub(
        r"<small>\{formatCurrency\(convertPrice\([^,]+,\s*[^,]+,\s*'EUR'\),\s*'EUR'\)\}</small>",
        r"",
        content
    )

    # Replace some basic hardcoded texts if any
    replacements = {
        'Приходы': "{t('orders')}",
        'Продукты': "{t('products')}",
        'Группы': "{t('groups')}",
        'Настройки': "{t('settings')}",
        'Загрузка': "{t('loading')}",
        'Ничего не найдено': "{t('empty')}",
        'Удалить': "{t('delete')}",
        'Сохранить': "{t('save')}",
        'Отмена': "{t('cancel')}",
    }
    
    for ru, en in replacements.items():
        content = content.replace(f">{ru}<", f">{en}<")
        content = content.replace(f'"{ru}"', f'"{en}"')
        content = content.replace(f"'{ru}'", f"'{en}'")
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

fix_file('e:/dev/Dzencode/src/pages/OrdersPage/OrdersPage.tsx')
fix_file('e:/dev/Dzencode/src/pages/ProductsPage/ProductsPage.tsx')
fix_file('e:/dev/Dzencode/src/shared/components/CreateOrderForm.tsx')
