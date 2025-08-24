// 测试页面JavaScript文件
// 使用jQuery进行DOM操作和事件处理

$(document).ready(function() {
    console.log('页面加载完成，jQuery版本：', $.fn.jquery);
    
    // 初始化页面
    initializePage();
    
    // 绑定所有事件
    bindEvents();
    
    // 启动时间显示
    updateTime();
    setInterval(updateTime, 1000);
});

/**
 * 页面初始化函数
 * 设置初始状态和检查必要元素
 */
function initializePage() {
    console.log('正在初始化页面...');
    
    // 检查必要元素是否存在
    const requiredElements = ['#test-btn', '#clear-btn', '#toggle-btn', '#user-input', '#submit-btn'];
    requiredElements.forEach(selector => {
        if ($(selector).length === 0) {
            console.warn('警告：元素不存在 -', selector);
        }
    });
    
    // 显示欢迎消息
    showNotification('页面初始化完成！', 'success');
    
    console.log('页面初始化完成');
}

/**
 * 绑定所有事件处理器
 */
function bindEvents() {
    console.log('正在绑定事件...');
    
    // 测试按钮点击事件
    $('#test-btn').on('click', function() {
        console.log('测试按钮被点击');
        handleTestButton();
    });
    
    // 清空按钮点击事件
    $('#clear-btn').on('click', function() {
        console.log('清空按钮被点击');
        handleClearButton();
    });
    
    // 切换按钮点击事件
    $('#toggle-btn').on('click', function() {
        console.log('切换按钮被点击');
        handleToggleButton();
    });
    
    // 提交按钮点击事件
    $('#submit-btn').on('click', function() {
        console.log('提交按钮被点击');
        handleSubmitButton();
    });
    
    // 输入框回车事件
    $('#user-input').on('keypress', function(e) {
        if (e.which === 13) { // 回车键
            console.log('输入框回车键被按下');
            handleSubmitButton();
        }
    });
    
    // 添加列表项按钮事件
    $('#add-item-btn').on('click', function() {
        console.log('添加列表项按钮被点击');
        handleAddListItem();
    });
    
    // 列表项点击事件（事件委托）
    $('#dynamic-list').on('click', '.list-item', function() {
        console.log('列表项被点击');
        handleListItemClick($(this));
    });
    
    // 盒子点击事件
    $('.box').on('click', function() {
        console.log('盒子被点击:', $(this).text());
        handleBoxClick($(this));
    });
    
    // 导航链接点击事件
    $('.nav-link').on('click', function(e) {
        e.preventDefault();
        const target = $(this).attr('href');
        console.log('导航链接被点击:', target);
        handleNavigation(target);
    });
    
    console.log('所有事件绑定完成');
}

/**
 * 处理测试按钮点击
 */
function handleTestButton() {
    const messages = [
        '测试功能正常运行！',
        'jQuery工作正常！',
        '按钮点击事件成功！',
        '页面交互功能正常！',
        '前端测试环境运行良好！'
    ];
    
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    const timestamp = new Date().toLocaleTimeString();
    
    $('#test-output').html(`
        <div class="message success">
            <strong>${randomMessage}</strong><br>
            <small>时间: ${timestamp}</small>
        </div>
    `);
    
    // 添加动画效果
    $('#test-output .message').hide().fadeIn(500);
    
    showNotification('测试按钮功能执行成功！', 'success');
}

/**
 * 处理清空按钮点击
 */
function handleClearButton() {
    $('#test-output').fadeOut(300, function() {
        $(this).html('<p>内容已清空...</p>').fadeIn(300);
    });
    
    $('#input-result').fadeOut(300, function() {
        $(this).html('<p>输入结果将显示在这里...</p>').fadeIn(300);
    });
    
    $('#user-input').val('');
    
    showNotification('内容已清空！', 'info');
}

/**
 * 处理切换按钮点击
 */
function handleToggleButton() {
    const $output = $('#test-output');
    
    if ($output.is(':visible')) {
        $output.slideUp(400);
        $('#toggle-btn').text('显示内容');
        showNotification('内容已隐藏', 'info');
    } else {
        $output.slideDown(400);
        $('#toggle-btn').text('隐藏内容');
        showNotification('内容已显示', 'info');
    }
}

/**
 * 处理提交按钮点击
 */
function handleSubmitButton() {
    const userInput = $('#user-input').val().trim();
    
    if (userInput === '') {
        showNotification('请输入内容！', 'warning');
        $('#user-input').focus();
        return;
    }
    
    const timestamp = new Date().toLocaleTimeString();
    const wordCount = userInput.length;
    
    $('#input-result').html(`
        <div class="result success">
            <h4>输入内容分析：</h4>
            <p><strong>内容：</strong> ${userInput}</p>
            <p><strong>字符数：</strong> ${wordCount}</p>
            <p><strong>提交时间：</strong> ${timestamp}</p>
            <p><strong>状态：</strong> 提交成功 ✅</p>
        </div>
    `);
    
    // 添加动画效果
    $('#input-result .result').hide().slideDown(500);
    
    showNotification('内容提交成功！', 'success');
    
    // 清空输入框
    $('#user-input').val('');
}

/**
 * 处理添加列表项
 */
function handleAddListItem() {
    const itemCount = $('#dynamic-list .list-item').length + 1;
    const newItem = $(`<li class="list-item">新添加的列表项 ${itemCount} - 点击切换状态</li>`);
    
    // 添加动画效果
    newItem.hide();
    $('#dynamic-list').append(newItem);
    newItem.slideDown(400);
    
    showNotification(`已添加列表项 ${itemCount}`, 'success');
}

/**
 * 处理列表项点击
 * @param {jQuery} $item - 被点击的列表项
 */
function handleListItemClick($item) {
    $item.toggleClass('active');
    
    if ($item.hasClass('active')) {
        $item.css('background-color', '#e8f5e8');
        showNotification('列表项已激活', 'success');
    } else {
        $item.css('background-color', '');
        showNotification('列表项已取消激活', 'info');
    }
}

/**
 * 处理盒子点击
 * @param {jQuery} $box - 被点击的盒子
 */
function handleBoxClick($box) {
    // 移除其他盒子的高亮
    $('.box').removeClass('highlighted');
    
    // 高亮当前盒子
    $box.addClass('highlighted');
    
    const boxText = $box.text();
    showNotification(`${boxText} 已被选中`, 'info');
    
    // 3秒后移除高亮
    setTimeout(() => {
        $box.removeClass('highlighted');
    }, 3000);
}

/**
 * 处理导航点击
 * @param {string} target - 目标锚点
 */
function handleNavigation(target) {
    if (target.startsWith('#')) {
        const $target = $(target);
        if ($target.length > 0) {
            $('html, body').animate({
                scrollTop: $target.offset().top - 80
            }, 800);
            showNotification(`已跳转到 ${target}`, 'info');
        }
    }
}

/**
 * 更新时间显示
 */
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    
    $('#current-time').text(timeString);
}

/**
 * 显示通知消息
 * @param {string} message - 消息内容
 * @param {string} type - 消息类型 (success, info, warning, error)
 */
function showNotification(message, type = 'info') {
    console.log(`[${type.toUpperCase()}] ${message}`);
    
    // 可以在这里添加更复杂的通知UI
    // 目前只在控制台显示
}

/**
 * 调试函数 - 在控制台中可以调用
 */
window.debugInfo = function() {
    console.log('=== 页面调试信息 ===');
    console.log('jQuery版本:', $.fn.jquery);
    console.log('页面元素统计:');
    console.log('- 按钮数量:', $('button').length);
    console.log('- 输入框数量:', $('input').length);
    console.log('- 列表项数量:', $('.list-item').length);
    console.log('- 盒子数量:', $('.box').length);
    console.log('页面加载时间:', performance.now() + 'ms');
    console.log('==================');
};

// 页面加载完成后的欢迎消息
$(window).on('load', function() {
    console.log('页面完全加载完成！');
    console.log('可以在控制台中输入 debugInfo() 查看调试信息');
});